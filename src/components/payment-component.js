import React, { useState, useEffect } from 'react';
import ItemSelectionForm from "./item-selection";
import PaymentInfo from './payment-info';
import PaymentConfirm from './payment-confirm';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_xnFaHOBqDv0NhsCEPQtTLj9c0025sSw7c3");

const PaymentComponent = () => {
    const [formStates, changeForm] = useState({
        currProgress: 1,
        sysControl: false,
        fileManage: false,
        recertFee: false,
        underTwoAcres: false,
        overTwoAcres: false,
        clientSecret: '',
        paymentID: '',
        totalCost: 0,
        fullName: '',
        email: '',
        cardDetails: {}
    })

    useEffect(() => {
        calcCost();
    }, [formStates.sysControl, formStates.fileManage, formStates.recertFee, formStates.underTwoAcres, formStates.overTwoAcres])

    const changeCheckedStatus = (event) => {
        switch (event.target.value) {
            case "sys":
                changeForm({ ...formStates, sysControl: event.target.checked });
                break;
            case "file":
                changeForm({ ...formStates, fileManage: event.target.checked });
                break;
            case "recert":
                changeForm({ ...formStates, recertFee: event.target.checked });
                break;
            case "under2":
                changeForm({ ...formStates, underTwoAcres: event.target.checked });
                break;
            case "over2":
                changeForm({ ...formStates, overTwoAcres: event.target.checked });
                break;
            default:
                break;
        }
    }

    const calcCost = () => {
        changeForm({
            ...formStates,
            totalCost: ((formStates.sysControl * 185) + (formStates.fileManage * 55) + (formStates.recertFee * 700) + (formStates.underTwoAcres * 350) + (formStates.overTwoAcres * 550))
        })
    }

    const handleCardInfo = payload => {
        if (payload.paymentMethod === undefined) {
            console.log("Error:", payload);
            return;
        }
        console.log("[PaymentMethod]", payload)
        changeForm({
            ...formStates,
            paymentID: payload.paymentMethod.id,
            fullName: payload.paymentMethod.billing_details.name,
            email: payload.paymentMethod.billing_details.email,
            cardDetails: payload.paymentMethod.card,
            currProgress: 3
        })
    };

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

        post(data)
            .then((res) => {
                if (res.client_secret) {
                    changeForm({
                        ...formStates,
                        clientSecret: res.client_secret,
                        currProgress: 2
                    })
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log("Error ", error)
            })
    }

    const reverseForm = (event) => {
        event.preventDefault();
        changeForm({
            ...formStates,
            currProgress: (formStates.currProgress === 3 ? 2 : formStates.currProgress === 2 ? 1 : 1)
        })
    }

    return (
        <div>
            <ItemSelectionForm progress={formStates.currProgress} submitTotal={submitTotal} reverseForm={reverseForm} changeCheckedStatus={changeCheckedStatus} totalCost={formStates.totalCost} />
            <PaymentInfo progress={formStates.currProgress} handleCardInfo={handleCardInfo} reverseForm={reverseForm} stripePubKey={stripePromise} />
            <PaymentConfirm currState={formStates} reverseForm={reverseForm} stripePubKey={stripePromise} />
        </div>
    )
}

export default PaymentComponent;