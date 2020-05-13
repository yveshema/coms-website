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

const Form = styled.form`
    width: 100%;
    label, input, .stripeInput {
        width: 100%;
    }

    label {
        margin: 0;
    }

    input, .stripeInput {
        border: 1px solid #C1C1C1;
        border-radius: 0.25rem;
        padding: 5px 12px;
        background-color: white;
        font-family: inherit;
    }

    .expiration-align {
        display: flex;
        justify-content: space-between;
        width: 50%;
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

// Custom fonts currently don't seem to be working with Stripe. Needs some looking into.
const stripeStyle = {
    style: {
        base: {
            fontSize: '18px',
            fontFamily: 'Rubik, Roboto, Sans-Serif',
            lineHeight: '1.8'
        },
        invalid: {

        }
    }
}

const PaymentForm = (props) => {
    const [billingInfo, changeInfo] = useState({
        fullName: '',
        emailAddress: ''
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

        const payload = await stripe.createPaymentMethod({
            billing_details: {
                name: billingInfo.fullName,
                email: billingInfo.emailAddress
            },
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
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
        <Form style={props.progress === 2 ? {display: 'block'} : {display: 'none'}} onSubmit={handleSubmit}>
            <div className="form-align">
                <label for="fullNameInput">Full Name
                    <input onChange={handleInputChange} id="fullNameInput" name='fullName' />
                </label>
                <label for="emailInput">Email Address
                    <input onChange={handleInputChange} id="emailInput" type="email" name='email' />
                </label>
            </div>

            <div className="form-align">
                <label for="cardNumInput">
                    Card number
                <CardNumberElement
                        className="stripeInput"
                        options={stripeStyle}
                        onChange={handleStripeChange}
                        id="cardNumInput"
                    />
                </label>
                <div className="form-align-last">
                    <label for="expiryInput">
                        Expiry
                        <CardExpiryElement
                            className="stripeInput"
                            options={stripeStyle}
                            id="expiryInput"
                        />
                    </label>
                    <label for="cvcInput">
                        CVC
                        <CardCvcElement
                            className="stripeInput"
                            options={stripeStyle}
                            id="cvcInput"
                        />
                    </label>
                </div>
            </div>
            <button onClick={props.reverseForm}>Back</button>
            <button type="submit" disabled={!stripe}>Review and Confirm</button>
        </Form>
    )
}

const PaymentInfo = (props) => {
    return (
        <Elements stripe={props.stripePubKey} >
            <PaymentForm progress={props.progress} reverseForm={props.reverseForm} handleCardInfo={props.handleCardInfo} />
        </Elements>
    )
}

export default PaymentInfo;