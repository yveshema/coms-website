import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Elements,
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import CryptoForm from './crypto-form';

const Container = styled.div`
    width: 100%;
    max-width: 768px;
    margin: auto;

    p {
        font-style: italic;
        color: black;
        border-bottom: 1px solid hsla(0,0%,0%,0.2);
        margin: 30px 0px;
        padding-bottom: 30px;
    }

    label, input, .stripeInput {
        width: 100%;
    }

    label {
        margin: 0;
    }

    input, .stripeInput {
        font-size: 16px;
        border: 1px solid #C1C1C1;
        border-radius: 0.25rem;
        padding: 5px 12px;
        background-color: white;
    }

    .error {
        color: red;
        font-size: 0.7em;
    }

    .stripeInput {
        padding: 7.4px 12px;
    }

    .expiration-align {
        display: flex;
        justify-content: space-between;
        width: 50%;
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
        width: 14em;
        -webkit-transition: 0.25s;
        -moz-transition: 0.25s;
        -o-transition: 0.25s;
        transition: 0.25s;
    }

    .buttonNext:disabled {
        background-color: white;
        color: #626262;
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

    @media only screen and (min-width: 769px) {
        .form-align {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        label {
            margin: 5px;
        }
    }

    @media only screen and (min-width: 481px) {
        .form-align-last {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
    }
`

const stripeStyle = {
    style: {
        base: {
            fontSize: '16px',
            fontFamily: 'Rubik, Roboto, Sans-Serif'
        },
        invalid: {

        }
    }
}

const elementOptions = {
    fonts: [
        {
            cssSrc: 'https://fonts.googleapis.com/css2?family=Roboto&family=Rubik'
        }
    ]
}

const PaymentForm = (props) => {
    const [billingInfo, changeInfo] = useState({
        fullName: '',
        emailAddress: '',
        isLoading: false
    })

    const [error, setError] = useState(null);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Do not submit if missing valid name. Allows apostrophes and hyphens
        if (!(/^[a-zA-Z-' ]+$/).test(billingInfo.fullName)) {
            setError("Invalid Name. ");
            return;
        }

        // Do not submit if value does not match a valid email format
        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(billingInfo.emailAddress))) {
            setError("Invalid Email address. ");
            return;
        }

        changeInfo({ ...billingInfo, isLoading: true })

        // Send billing info to Stripe and return a card info object
        const payload = await stripe.createPaymentMethod({
            billing_details: {
                name: billingInfo.fullName,
                email: billingInfo.emailAddress
            },
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
        changeInfo({ ...billingInfo, isLoading: false })
        props.handleCardInfo(payload)
    };

    // Saves customer name and email to state
    const handleInputChange = (event) => {
        event.preventDefault();
        const currTarget = event.target.name;
        changeInfo({
            ...billingInfo,
            fullName: currTarget === 'fullName' ? event.target.value : billingInfo.fullName,
            emailAddress: currTarget === 'email' ? event.target.value : billingInfo.emailAddress
        })
    }

    // Client side function to validate card number, expiry date, and ccv.
    // Card number error handling uses the Luhn Algorithm for validation
    const handleStripeChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
    }
    return (
        <Container>
            <p>
                Please provide your payment information below.
            </p>
            <form style={props.progress === 2 ? { display: 'block' } : { display: 'none' }} onSubmit={handleSubmit}>
                <div className="form-align">
                    <label htmlFor="fullNameInput">Full Name
                    <input onChange={handleInputChange} id="fullNameInput" name='fullName' />
                    </label>
                    <label htmlFor="emailInput">Email Address
                    <input onChange={handleInputChange} id="emailInput" type="email" name='email' />
                    </label>
                </div>

                <div className="form-align">
                    <label htmlFor="cardNumInput" style={{ width: 'calc(100% - 20px)' }}>
                        Card number
                        <CardNumberElement
                            className="stripeInput"
                            options={stripeStyle}
                            onChange={handleStripeChange}
                            id="cardNumInput"
                        />
                    </label>
                    <div className="form-align-last">
                        <label htmlFor="expiryInput">
                            Expiry
                        <CardExpiryElement
                                className="stripeInput"
                                options={stripeStyle}
                                onChange={handleStripeChange}
                                id="expiryInput"
                            />
                        </label>
                        <label htmlFor="cvcInput">
                            CVC
                        <CardCvcElement
                                className="stripeInput"
                                options={stripeStyle}
                                onChange={handleStripeChange}
                                id="cvcInput"
                            />
                        </label>
                    </div>
                </div>
                <div className="error">
                    {error !== null ? `${error} Please ensure all information is filled and valid.` : ''}
                </div>
                <div className="buttonDiv">
                    <button className="buttonBack" onClick={props.reverseForm}>Back</button>
                    <button className="buttonNext" type="submit" disabled={!stripe}>{billingInfo.isLoading ? <FontAwesomeIcon className="spinnerAnim" icon={faCircleNotch} /> : 'Review and Confirm'}</button>
                </div>
            </form>
        </Container>
    )
}

const PaymentInfo = (props) => {
    if (props.progress === 2 && props.paymentType === 'card') {
        return (
            <Elements stripe={props.stripePubKey} options={elementOptions}>
                <PaymentForm progress={props.progress} reverseForm={props.reverseForm} handleCardInfo={props.handleCardInfo} />
            </Elements>
        )
    } else if (props.progress === 2 && props.paymentType === 'crypto') {
        return (
            <CryptoForm 
            progress={props.progress} 
            handleCryptoTransactionInfo={props.handleCryptoTransactionInfo} 
            totalCost={props.totalCost} 
            reverseForm={props.reverseForm}
            sysControl={props.sysControl}
            fileManage={props.fileManage}
            recertFee={props.recertFee}
            underTwoAcres={props.underTwoAcres}
            overTwoAcres={props.overTwoAcres}>
            </CryptoForm>
        );
    } else {
        return null;
    }

}

export default PaymentInfo;
