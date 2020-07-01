import React, { useState, useEffect } from 'react';
import ItemSelectionForm from "./item-selection";
import PaymentInfo from './payment-info';
import PaymentConfirm from './payment-confirm';
import PayProgress from './payment-progress';
import { loadStripe } from "@stripe/stripe-js";
import styled from 'styled-components';

// Replace public test Stripe key with live Stripe key to actually bill customers
// The private test key also needs to be replaced in the serverless function
const stripePromise = loadStripe("pk_test_xnFaHOBqDv0NhsCEPQtTLj9c0025sSw7c3");

const PayDiv = styled.div`
    padding: 2em 2em;
    max-width: 100%;
    background-color: white;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.161);

    /* @Shema changed the min-width from 768px to 788px because the sync with
     * the rest of the main content area
     */ 
    @media screen and (max-width: 1023px) and (min-width: 788px){
        max-width: calc(100% + 140px);
        margin: 0 -70px;
    }   
`

const PaymentComponent = () => {
    const [formStates, changeForm] = useState({
        currProgress: 1,
        paymentType: null,
        isLoading: false,
        sysControl: false,
        fileManage: false,
        recertFee: false,
        underTwoAcres: false,
        overTwoAcres: false,
        intentID: '',
        clientSecret: '',
        paymentID: '',
        totalCost: 0,
        fullName: '',
        email: '',
        cardDetails: {},
        cryptoDetails: null
    })

    // Recalculate cost whenever any of the billing option states are changed
    useEffect(() => {
        calcCost();
    }, [formStates.sysControl, formStates.fileManage, formStates.recertFee, formStates.underTwoAcres, formStates.overTwoAcres])

    const changeCheckedStatus = (val) => {
        switch (val) {
            case "sys":
                changeForm({ ...formStates, sysControl: !formStates.sysControl });
                break;
            case "file":
                changeForm({ ...formStates, fileManage: !formStates.fileManage });
                break;
            case "recert":
                changeForm({ ...formStates, recertFee: !formStates.recertFee });
                break;
            case "under2":
                changeForm({ ...formStates, underTwoAcres: !formStates.underTwoAcres });
                break;
            case "over2":
                changeForm({ ...formStates, overTwoAcres: !formStates.overTwoAcres });
                break;
            default:
                break;
        }
    }

    // Calculate the total cost for front end display only
    const calcCost = () => {
        changeForm({
            ...formStates,
            totalCost: ((formStates.sysControl * 185) + (formStates.fileManage * 55) + (formStates.recertFee * 700) + (formStates.underTwoAcres * 350) + (formStates.overTwoAcres * 550))
        })
    }

    // Write card info to state if valid
    const handleCardInfo = payload => {
        if (payload.paymentMethod === undefined) {
            return;
        }
        changeForm({
            ...formStates,
            paymentID: payload.paymentMethod.id,
            fullName: payload.paymentMethod.billing_details.name,
            email: payload.paymentMethod.billing_details.email,
            cardDetails: payload.paymentMethod.card,
            currProgress: 3
        })
    };

    const handleCryptoTransactionInfo = payload => {
        if (payload.result === undefined) {
            return;
        }
        changeForm({
            ...formStates,
            cryptoDetails: payload.result,
            currProgress: 3
        })
    }

    const post = async (data) => {
        const { url } = data;

        delete data.url;

        const params = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        const response = await fetch(url, params);

        if (response.status < 200 && response.status >= 300) {
            const res = await response.json();

            throw new Error(res);
        }

        return response.json();
    };

    // Create a new Payment Intent with Stripe and return Client Secret
    const submitTotal = (event) => {
        event.preventDefault();

        // Don't move forward if no options are selected
        if (!formStates.sysControl && !formStates.fileManage && !formStates.recertFee && !formStates.underTwoAcres && !formStates.overTwoAcres) {
            return;
        }

        const data = {
            url: "https://l925h1rxba.execute-api.us-west-2.amazonaws.com/dev/create-bill",
            options: {
                sysControl: formStates.sysControl,
                fileManage: formStates.fileManage,
                recertFee: formStates.recertFee,
                underTwoAcres: formStates.underTwoAcres,
                overTwoAcres: formStates.overTwoAcres,
            }
        }

        // For part 1 of the payment form
        changeForm({
            ...formStates,
            isLoading: true
        })

        post(data)
            .then((res) => {
                if (res.client_secret) {
                    changeForm({
                        ...formStates,
                        clientSecret: res.client_secret,
                        intentID: res.id,
                        currProgress: 2,
                        paymentType: 'card',
                        isLoading: false
                    })
                } else {
                    changeForm({
                        ...formStates,
                        clientSecret: 'Error',
                        isLoading: false
                    })
                    console.log(res)
                }
            })
            .catch((error) => {
                changeForm({
                    ...formStates,
                    isLoading: false
                })
                console.log("Error ", error)
            })
    }

    // Send user forward in payment to submit additional info
    const submitTotalCrypto = (event) => {
        event.preventDefault();
        // Don't move forward if no options are selected
        if (!formStates.sysControl && !formStates.fileManage && !formStates.recertFee && !formStates.underTwoAcres && !formStates.overTwoAcres) {
            return;
        } else {
            changeForm({
                ...formStates,
                currProgress: 2,
                paymentType: 'crypto',
                isLoading: false
            })
        }

    }

    // Move back in the form
    const reverseForm = (event) => {
        event.preventDefault();
        changeForm({
            ...formStates,
            currProgress: (formStates.currProgress === 3 ? 2 : formStates.currProgress === 2 ? 1 : 1)
        })
    }

    // Move to final step of form
    const finalizePayment = () => {
        changeForm({
            ...formStates,
            currProgress: 4
        })
    }

    const sendEmail = () => {
        // Update Payment Intent with receipt email address
        const data = {
            url: "https://l925h1rxba.execute-api.us-west-2.amazonaws.com/dev/update-bill",
            piID: formStates.intentID,
            email: formStates.email
        }

        post(data)
            .then((res) => {
                if (res.client_secret) {
                    console.log("Sent!")
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                changeForm({
                    ...formStates,
                    isLoading: false
                })
                console.log("Error ", error)
            })
    }

    return (
        <PayDiv>
            <PayProgress progress={formStates.currProgress} />
            <ItemSelectionForm progress={formStates.currProgress} submitTotal={submitTotal} submitTotalCrypto={submitTotalCrypto} reverseForm={reverseForm} changeCheckedStatus={changeCheckedStatus} totalCost={formStates.totalCost} isLoading={formStates.isLoading} clientSecret={formStates.clientSecret} />
            <PaymentInfo progress={formStates.currProgress} 
            paymentType={formStates.paymentType} 
            handleCardInfo={handleCardInfo} 
            handleCryptoTransactionInfo={handleCryptoTransactionInfo} 
            reverseForm={reverseForm} 
            totalCost={formStates.totalCost}
            sysControl={formStates.sysControl}
            fileManage={formStates.fileManage}
            recertFee={formStates.recertFee}
            underTwoAcres={formStates.underTwoAcres}
            overTwoAcres={formStates.overTwoAcres}
            stripePubKey={stripePromise} />
            <PaymentConfirm currState={formStates} sendEmail={sendEmail} reverseForm={reverseForm} stripePubKey={stripePromise} finalizePayment={finalizePayment} />
        </PayDiv>
    )
}

export default PaymentComponent;