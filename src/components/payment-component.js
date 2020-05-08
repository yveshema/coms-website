import React, { useState, useEffect } from 'react';
import ItemSelectionForm from "./item-selection";
import PaymentInfo from './payment-info';
import { loadStripe } from "@stripe/stripe-js";
import { useStripe } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_xnFaHOBqDv0NhsCEPQtTLj9c0025sSw7c3");

const PaymentComponent = () => {
    const [formStates, changeForm] = useState({
        sysControl: false,
        fileManage: false,
        recertFee: false,
        underTwoAcres: false,
        overTwoAcres: false,
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
            totalCost: ('NCD ' + ((formStates.sysControl * 185) + (formStates.fileManage * 55) + (formStates.recertFee * 700) + (formStates.underTwoAcres * 350) + (formStates.overTwoAcres * 550)))
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
            fullName: payload.paymentMethod.billing_details.name,
            email: payload.paymentMethod.billing_details.email,
            cardDetails: payload.paymentMethod.card
        })
    };

    const submitTotal = (event) => {
        event.preventDefault();
        console.log(event.target)
    }

    return (
        <div>
            <ItemSelectionForm submitTotal={submitTotal} changeCheckedStatus={changeCheckedStatus} totalCost={formStates.totalCost}/>
            <PaymentInfo handleCardInfo={handleCardInfo} stripePubKey={stripePromise} />
        </div>
    )
}

export default PaymentComponent;