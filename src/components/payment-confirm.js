import React, { useState } from 'react';
import { Elements, useStripe } from "@stripe/react-stripe-js";
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    max-width: 768px;
    margin: auto;

    p {
        font-style: italic;
        color: black;
    }    

    .buttonDiv {
        display: flex;
        justify-content: space-between;
    }

    .buttonNext, .buttonBack {
        font-size: 1em;
        font-weight: 500;
        padding: 3px 30px;
        border-radius: 4px;
        margin: 5px;
        cursor: pointer;
        -webkit-transition: 0.25s;
        -moz-transition: 0.25s;
        -o-transition: 0.25s;
        transition: 0.25s;
    }

    .buttonNext {
        border: 0;
        background-color: #FD6927;
        color: white;
    }

    .buttonBack {
        border: solid 2px #626262;
        background-color: white;
        color: #626262;
    }

    .buttonBack:hover {
        background-color: #626262;
        color: white;
    }
`

const PaymentSummary = (props) => {
    // paymentSuccess will change to either error or succeeded
    const [ paymentSuccess, changePayState ] = useState( null );
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const stripe = useStripe();

    const submitPayment = async (event) => {
        event.preventDefault();
        const result = await stripe.confirmCardPayment(props.currState.clientSecret, {
            payment_method: props.currState.paymentID
        });

        if (result.paymentIntent) {
            changePayState(result.paymentIntent.status)
        } else {
            changePayState("error")
        }

        console.log(result)
    }

    if (props.currState.currProgress === 3 && paymentSuccess !== "succeeded") {
        let ccBrand = props.currState.cardDetails.brand;
        return (
            <Container>
                <div>
                    <p>Items:</p>
                    {props.currState.sysControl ? <p>NCD 185 System Control Fee</p> : ''}
                    {props.currState.fileManage ? <p>NCD 55 File Management Fee</p> : ''}
                    {props.currState.recertFee ? <p>NCD 700 Recertification Fee</p> : ''}
                    {props.currState.underTwoAcres ? <p>NCD 350 For Crops Below 2 Acres</p> : ''}
                    {props.currState.overTwoAcres ? <p>NCD 550 For Crops Above 2 Acres</p> : ''}
                </div>
                <div>
                    <p>Email Address:</p>
                    <p>
                        {props.currState.email}
                    </p>
                </div>
                <div>
                    <p>Credit Card:</p>
                    <p>
                        {ccBrand[0].toUpperCase()}{ccBrand.slice(1)}: ************{props.currState.cardDetails.last4}
                    </p>
                    <p>
                        Expires: {monthArr[props.currState.cardDetails.exp_month]} {props.currState.cardDetails.exp_year}
                    </p>
                </div>
                <div>
                    <p>
                        Total: NCD {props.currState.totalCost}
                    </p>
                </div>
                <div className='buttonDiv'>
                    <button className='buttonBack' onClick={props.reverseForm}>Back</button>
                    <button className='buttonNext' onClick={submitPayment}>Confirm Payment</button>
                </div>
            </Container>
    )} else if (props.currState.currProgress === 3 && paymentSuccess === "succeeded") {
        return (
            <Container>
                <h1>Thank you!</h1>
                <h2>A confirmation email has been sent to your email</h2>
            </Container>
        )
    } else {
        return null;
    }
}

const PaymentConfirm = (props) => {
    return (
        <Elements stripe={props.stripePubKey}>
            <PaymentSummary currState={props.currState} reverseForm={props.reverseForm} />
        </Elements>
    )
}

export default PaymentConfirm;