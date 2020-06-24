import React, { useState } from 'react';
import { Elements, useStripe } from "@stripe/react-stripe-js";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
    width: 100%;
    max-width: 768px;
    margin: auto;

    h1 {
        color: black;
        font-style: italic;
        border-bottom: 1px solid hsla(0,0%,0%,0.2);
        margin: 30px 0px !important;
        padding-bottom: 30px;
        font-size: 20px;
        font-weight: normal;
    }

    h2, p {
        font-size: 1em !important;
        margin-top: 0 !important;
        margin-bottom: 0;
        color: black;
        font-style: normal;
    }

    h2, h3 {
        font-weight: 500;
    }

    h3 {
        font-size: 1.5em;
        color: black;
        margin-top: 30px;
    }

    .buttonDiv {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid hsla(0,0%,0%,0.2);
        margin-top: 30px;
        padding-top: 30px;
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
        width: 13em;
        -webkit-transition: 0.25s;
        -moz-transition: 0.25s;
        -o-transition: 0.25s;
        transition: 0.25s;
    }

    .buttonNext:active, .buttonNext:hover {
        background-color: #E55616;
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

    .row {
        flex-direction: column;
        padding: 0;
    }

    .columnDiv {
        border-bottom: 1px solid hsla(0,0%,0%,0.2);
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .thankYouHeader {
        color: #626262;
        font-size: 2.375em;
        font-style: normal;
        font-weight: 500;
        border: none;
        text-align: center;
        padding-bottom: 0;
    }

    .centerThanksDiv {
        position: relative;
        transform: translateY(50%);
    }

    .checkCircleDiv {
        margin: auto;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        border: 3px solid #53AB34;
    }

    .checkSvg {
        fill: none;
        stroke: #53AB34;
        stroke-width: 4;
        stroke-dasharray: 60;
        stroke-dashoffset: 60;
        animation: checkmark 1s ease-out forwards;
    }

    @media only screen and (min-width:769px) {
        h2 {
            margin-bottom: 15px;
        }
        .columnDiv {
            width: calc(100% / 3);
            border-bottom: none;
            padding-bottom: 0;
            margin-bottom: 0;
        }
        .row {
            flex-direction: row;
        }
    }

    @keyframes checkmark {
        to {
            stroke-dashoffset: 120;
        }
    }
`

const PaymentSummary = (props) => {
    // paymentSuccess will change to either error or succeeded
    const [paymentSuccess, changePayState] = useState(null);
    const [isLoading, changeLoad] = useState(false);
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const stripe = useStripe();

    // Note: Stripe does not automatically send email receipts in test mode
    const submitPayment = async (event) => {
        event.preventDefault();
        changeLoad(true);
        const result = await stripe.confirmCardPayment(props.currState.clientSecret, {
            payment_method: props.currState.paymentID,
            receipt_email: props.currState.email
        });

        changeLoad(false);
        if (result.paymentIntent) {
            changePayState(result.paymentIntent.status)
            props.finalizePayment();
        } else {
            changePayState(result.error.message ? result.error : "Error")
        }

        console.log(result)
    }

    // This component contains two different JSX returns
    if (props.currState.currProgress === 3 && props.currState.paymentType === 'card' && paymentSuccess !== "succeeded") {
        let ccBrand = props.currState.cardDetails.brand ? props.currState.cardDetails.brand : 'undefined';
        return (
            <Container>
                <h1>
                    Please review your order information below.
                </h1>
                <div className="row">
                    <div className="columnDiv">
                        <h2>Items:</h2>
                        {props.currState.sysControl ? <p>NCD 185 System Control Fee</p> : ''}
                        {props.currState.fileManage ? <p>NCD 55 File Management Fee</p> : ''}
                        {props.currState.recertFee ? <p>NCD 700 Recertification Fee</p> : ''}
                        {props.currState.underTwoAcres ? <p>NCD 350 For Crops Below 2 Acres</p> : ''}
                        {props.currState.overTwoAcres ? <p>NCD 550 For Crops Above 2 Acres</p> : ''}
                    </div>
                    <div className="columnDiv">
                        <h2>Email Address:</h2>
                        <p>
                            {props.currState.email}
                        </p>
                    </div>
                    <div className="columnDiv">
                        <h2>Credit Card:</h2>
                        <p>
                            {ccBrand[0].toUpperCase()}{ccBrand.slice(1)}: ************{props.currState.cardDetails.last4 ? props.currState.cardDetails.last4 : 'null'}
                        </p>
                        <p>
                            Expires: {monthArr[props.currState.cardDetails.exp_month ? props.currState.cardDetails.exp_month : 0]} {props.currState.cardDetails.exp_year ? props.currState.cardDetails.exp_year : 1990}
                        </p>
                    </div>
                </div>
                <div>
                    <h3>
                        Total: NCD {props.currState.totalCost}
                    </h3>
                </div>
                {paymentSuccess !== null && paymentSuccess !== 'succeeded' &&
                    <div style={{ fontSize: '0.7em', color: 'red' }}>
                        {paymentSuccess.message}
                    </div>}
                <div className='buttonDiv'>
                    <button className='buttonBack' onClick={(event) => {changePayState(null); props.reverseForm(event)}}>Back</button>
                    <button className='buttonNext' onClick={submitPayment}>{isLoading ? <FontAwesomeIcon className="spinnerAnim" icon={faCircleNotch} /> : 'Confirm Payment'}</button>
                </div>
            </Container>
        )
    } else if (props.currState.currProgress === 4 && paymentSuccess === "succeeded") {
        return (
            <Container style={{minHeight: '500px'}}>
                <div className="centerThanksDiv">
                <div className="checkCircleDiv">
                    <svg viewBox="0 0 70 70">
                        <polyline className="checkSvg" points="56,20 28,52 15,40" />
                    </svg>
                </div>
                <h1 className="thankYouHeader">Thank you!</h1>
                <h2 style={{fontWeight: 'normal', textAlign: 'center'}}>A confirmation email has been sent to your email</h2>
                <button className="buttonNext" style={{marginLeft: '50%', transform: 'translateX(-50%)'}} onClick={props.sendEmail}>Resend Email</button>
                </div>
            </Container>
        )
    } else {
        return null;
    }
}

const PaymentConfirm = (props) => {
    return (
        <Elements stripe={props.stripePubKey}>
            <PaymentSummary currState={props.currState} sendEmail={props.sendEmail} reverseForm={props.reverseForm} finalizePayment={props.finalizePayment}/>
        </Elements>
    )
}

export default PaymentConfirm;