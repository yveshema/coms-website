import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Input } from "./input-components";

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

    label, input {
        width: 100%;
    }

    label {
        margin: 0;
    }

    input {
        font-size: 16px;
        border: 1px solid #C1C1C1;
        border-radius: 0.25rem;
        padding: 5px 12px;
        background-color: white;
    }

    select {
        font-size: 16px;
        border: 1px solid #C1C1C1;
        border-radius: 0.25rem;
        padding: 7px 12px;
        background-color: white;
        width: 100%;
    }

    select:after {

    }

    .error, .disclaimerText {
        color: red;
        font-size: 0.7em;
    }

    .disclaimerText {
        color: black;
    }

    .expiration-align {
        display: flex;
        justify-content: space-between;
        width: 50%;
    }

    .buttonDiv {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
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

    .buttonNext:disabled, .buttonNext[disabled], .buttonNext:disabled:hover {
        background-color: bisque;
        color: #848484;
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

const Row = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
margin-bottom: 5px;
`

const Label = styled.div`
margin: 0 1em;
display:block;
text-align: left;
font-size: .8em;
line-height: 1.2;
`

const StyledInput = styled(Input)`
width: 14em !important;
border: 1px solid #C1C1C1;
border-radius: 0.25rem;
font-weight: 500;
padding: 5px 12px;
background-color: white;
box-shadow: none;
`

const CryptoForm = (props) => {
    const [billingInfo, changeInfo] = useState({
        fullName: '',
        emailAddress: '',
        coinType: null,
        coinRates: null,
        cryptoVal: 0,
        isReady: false,
        isLoading: false
    })

    const [error, setError] = useState(null);

    // Get the current exchange rates for all supported coins for the form and write to state on mount
    useEffect(() => {
        getCoinRates();
	//eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Saves customer name and email to state
    const handleInputChange = (event) => {
        event.preventDefault();
        const currTarget = event.target.name;
        setError(null);
        changeInfo({
            ...billingInfo,
            fullName: currTarget === 'fullName' ? event.target.value : billingInfo.fullName,
            emailAddress: currTarget === 'email' ? event.target.value : billingInfo.emailAddress
        })
    }

    const handleSelectChange = (event) => {
        const currTarget = event.target.value;
        setError(null);
        changeInfo({
            ...billingInfo,
            coinType: currTarget,
            cryptoVal: ((billingInfo.coinRates.USD.rate_btc * (props.totalCost * 0.37).toFixed(2)) / billingInfo.coinRates[currTarget].rate_btc)
        })
    }

    const hmacKey = async (request) => {
        const hmac = await fetch('https://l925h1rxba.execute-api.us-west-2.amazonaws.com/dev/encrypt-key', {
            method: "POST",
            body: request,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(data => {
            return data.json()
        })
        return hmac;
    }

    const post = async (data) => {

        const { url } = data;

        delete data.url;

        const hmac = await hmacKey(data.request);

        const params = {
            method: "POST",
            body: data.request,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
                "HMAC": hmac.hmacSig
            }
        }

        const response = await fetch(url, params);

        if (response.status < 200 && response.status >= 300) {
            const res = await response.json();

            throw new Error(res);
        }

        return response.json();
    };

    const getCoinRates = async () => {
        const data = {
            url: 'https://www.coinpayments.net/api.php/',
            request: 'version=1&cmd=rates&accepted=2&key=95a4e2d1694cbd11a361cd03ecb050f0a3c0dcbc545705442969c89f23a6e704&format=json'
        }

        post(data)
            .then(response => {
                if (response.result !== undefined) {
                    changeInfo({
                        ...billingInfo,
                        isReady: true,
                        coinRates: response.result
                    })
                }
            })
            .catch(error => {
                console.log("Error ", error)
            })
    }


    const handleSubmit = async event => {
        event.preventDefault();

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

        // Do not submit if no coin is selected
        if (!billingInfo.coinType) {
            setError("No Coin Selected. ");
            return;
        }

        // Prevent submission if user doesn't even know what the total cost is in their coin
        if (!billingInfo.isReady) {
            return;
        }

        changeInfo({
            ...billingInfo,
            isLoading: true
        })

        const data = {
            url: 'https://www.coinpayments.net/api.php/',
            request: `version=1&cmd=create_transaction&amount=${(props.totalCost * 0.37).toFixed(2)}&currency1=USD&currency2=${billingInfo.coinType}&key=95a4e2d1694cbd11a361cd03ecb050f0a3c0dcbc545705442969c89f23a6e704`
        }

        post(data)
            .then(response => {
                changeInfo({
                    ...billingInfo,
                    isLoading: false
                })
                props.handleCryptoTransactionInfo(response);
            })
            .catch(error => {
                console.log("Error ", error)
                changeInfo({
                    ...billingInfo,
                    isLoading: false
                })
            })
    };

    return (
        <Container>
            <p>
                Please provide your payment information below.
            </p>
            <form style={{ display: 'block' }} onSubmit={handleSubmit}>
                <div className="form-align">
                    <label htmlFor="fullNameInput">Full Name
                        <input onChange={handleInputChange} id="fullNameInput" name='fullName' />
                    </label>
                    <label htmlFor="emailInput">Email Address
                        <input onChange={handleInputChange} id="emailInput" type="email" name='email' />
                    </label>
                </div>
                <div className="form-align">
                    <label htmlFor="coinTypeSelect">Cryptocurrency
                        <select id="coinTypeSelect" name="coin" onChange={handleSelectChange}>
                            <option value="none" selected disabled hidden>{billingInfo.isReady ? 'Select Coin' : 'Getting Current Rates'}</option>
                            {billingInfo.isReady &&
                                <option value="LTCT">Litecoin Testnet - Test Purposes Only</option>
                            }
                        </select>
                    </label>
                </div>

                <Row style={{ borderTop: '1px solid hsla(0,0%,0%,0.2)', marginTop: '30px', paddingTop: '30px' }}>
                    <Label>Amount in Fiat Currency: </Label>
                    <StyledInput type="text" value={'USD ' + (props.totalCost * 0.37).toFixed(2)} placeholder="USD" />
                </Row>
                <Row>
                    <Label>{billingInfo.coinType ? `Approximate Amount in ${billingInfo.coinType}` : 'Amount in Selected Cryptocurrency'} </Label>
                    <StyledInput type="text" value={billingInfo.coinType ? `${billingInfo.coinType} ${billingInfo.cryptoVal}` : "None Selected"} />
                </Row>
                <div className="disclaimerText">
                    Note: This is a clientside conversion and may not be completely accurate to current rates.
                </div>
                <div className="error">
                    {error !== null ? `${error} Please ensure all information is filled and valid.` : ''}
                </div>
                <div className="buttonDiv">
                    <button className="buttonBack" onClick={props.reverseForm}>Back</button>
                    <button className="buttonNext" type="submit" disabled={!billingInfo.isReady}>{billingInfo.isLoading ? <FontAwesomeIcon className="spinnerAnim" icon={faCircleNotch} /> : 'Create Transaction'}</button>
                </div>
            </form>
        </Container>
    )
}

export default CryptoForm;
