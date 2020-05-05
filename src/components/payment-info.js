import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
    width: 100%;
    label, input {
        width: 100%;
    }

    label {
        margin: 0;
    }

    input {
        border: 1px solid #C1C1C1;
        border-radius: 0.25rem;
        padding: 5px 12px;
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

const PaymentInfo = (props) => {
    const [billingInfo, changeInfo] = useState({
        fullName: '',
        emailAddress: '',
        cardNum: '',
        expMonth: '',
        expYear: '',
        ccvNum: ''
    })

    const handleInputChange = (event) => {
        event.preventDefault();
        const currTarget = event.target.name;
        changeInfo({
            ...billingInfo,
            fullName: currTarget === 'fullName' ? event.target.value : billingInfo.fullName,
            emailAddress: currTarget === 'email' ? event.target.value : billingInfo.emailAddress,
            cardNum: currTarget === 'card' ? event.target.value : billingInfo.cardNum,
            expMonth: currTarget === 'month' ? event.target.value : billingInfo.expMonth,
            expYear: currTarget === 'year' ? event.target.value : billingInfo.expYear,
            ccvNum: currTarget === 'ccv' ? event.target.value : billingInfo.ccvNum
        })
    }

    return (
        <Form>
            <div className="form-align">
                <label for="fullNameInput">Full Name
                    <input onChange={handleInputChange} id="fullNameInput" name='fullName' />
                </label>
                <label for="emailInput">Email Address
                    <input onChange={handleInputChange} id="emailInput" type="email" name='email' />
                </label>
            </div>

            <div className="form-align">
                <label for="cardInput">Card Number
                    <input onChange={handleInputChange} id="cardInput" name='card' />
                </label>
                <div className="form-align-last">
                    <label for="monthInput">Expiration
                        <div className="expiration-align">
                            <input onChange={handleInputChange} id="monthInput" name='month' placeholder="MM"/>
                            <input onChange={handleInputChange} id="yearInput" name='year' placeholder="YY"/>
                        </div>
                    </label>
                    <label for="ccvInput">CCV
                        <input onChange={handleInputChange} id="ccvInput" name='ccv' />
                    </label>
                </div>
            </div>
            <button>Back</button>
            <button>Review and Confirm</button>
        </Form>
    )
}

export default PaymentInfo;