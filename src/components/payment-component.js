import React, { useState } from 'react';
import PaymentInfo from './payment-info';

const PaymentComponent = () => {
    const [ formStates, changeForm ] = useState({
        totalCost: 0
    })

    return (
        <PaymentInfo />
    )
}

export default PaymentComponent;