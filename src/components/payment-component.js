import React, { useState } from 'react';
import ItemSelectionForm from "../components/item-selection";
import PaymentInfo from './payment-info';

const PaymentComponent = () => {
    const [ formStates, changeForm ] = useState({
        totalCost: 0,
        fullName: '',
        email: '',
        cardType: '',
        lastFour: 0,
        expiryDate: ''
    })

    const handleCardInfo = payload => {
        if (payload.paymentMethod === undefined) {
            console.log("Error:", payload);
            return;
        }
        changeForm({
            ...formStates,
            fullName: payload.paymentMethod.billing_details.name,
            email: payload.paymentMethod.billing_details.email,
            cardType: payload.paymentMethod.card.brand,
            lastFour: payload.paymentMethod.card.last4,
            expiryDate: `${payload.paymentMethod.card.exp_month}/${payload.paymentMethod.card.exp_year}`
        })
      };

    return (
        <div>
            <ItemSelectionForm />
            <PaymentInfo handleCardInfo={handleCardInfo} />
        </div>
    )
}

export default PaymentComponent;