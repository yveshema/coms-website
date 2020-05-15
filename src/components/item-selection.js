import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import {
    Input,
    Button,
} from "./input-components";

const Container = styled.div`
max-width: 768px;
width: 100%;
margin: auto;

p {
    color: black;
    font-style: italic;
    border-bottom: 1px solid hsla(0,0%,0%,0.2);
    margin: 30px 0px;
    padding-bottom: 30px;
}
`

const Row = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
margin-bottom: 5px;
`

const SubmitButton = styled(Button)`
font-size: 1em;
font-weight: 500;
padding: 5px 20px;
width: 14em;
border-radius: 4px;
border: 0;
background-color: #FD6927;
color: white;
cursor: pointer;
-webkit-transition: 0.25s;
-moz-transition: 0.25s;
-o-transition: 0.25s;
transition: 0.25s;
`;

const Control = styled.label`
display: flex;
margin: 1em 0;
cursor: pointer;
text-align: left;
font-size: 1em;
line-height: 1.2;
align-items: center;

input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
    cursor: pointer;
}

.checkmark {
    position: inherit;
    height: 25px;
    width: 25px;
    margin-right: 15px;
    border: 1px solid #707070;
    border-radius: 4px;
}

.checkSvg {
    fill: none;
    stroke: white;
    stroke-width: 2;
}

svg {
    visibility: hidden;
}

:hover input ~ .checkmark{
    background-color: #cccccc;
}

input:checked ~ .checkmark {
    background-color: #626262;
}

input:checked ~ .checkmark svg {
    visibility: visible;
}

`

const Label = styled.div`
margin: 0 1em;
display:block;
text-align: left;
font-size: .8em;
line-height: 1.2;
`

const StyledInput = styled(Input)`
width: 14em;
border: 1px solid #C1C1C1;
border-radius: 0.25rem;
font-weight: 500;
padding: 5px 12px;
background-color: white;
box-shadow: none;
`

const ItemSelectionForm = (props) => {
    return (
        <Container style={props.progress === 1 ? { display: 'block' } : { display: 'none' }}>
            <p>
                Select the items you want to pay for according to the invoice you received.
            </p>
            <form onSubmit={props.submitTotal}>
                <Control>
                    <input type="checkbox" onChange={() => props.changeCheckedStatus("sys")} />
                    <span className="checkmark">
                        <svg viewBox="0 0 25 25">
                            <polyline className="checkSvg" points="23,3 8,20 1,12" />
                        </svg>
                    </span>
                    NCD 185 system control fee
                </Control>
                <Control>
                    <input type="checkbox" onChange={() => props.changeCheckedStatus("file")} />
                    <span className="checkmark">
                        <svg viewBox="0 0 25 25">
                            <polyline className="checkSvg" points="23,3 8,20 1,12" />
                        </svg>
                    </span>
                    NCD 55 file management fee
                </Control>
                <Control>
                    <input type="checkbox" onChange={() => props.changeCheckedStatus("recert")} />
                    <span className="checkmark">
                        <svg viewBox="0 0 25 25">
                            <polyline className="checkSvg" points="23,3 8,20 1,12" />
                        </svg>
                    </span>
                    NCD 700 recertification fee
                </Control>
                <Control>
                    <input type="checkbox" onChange={() => props.changeCheckedStatus("under2")} />
                    <span className="checkmark">
                        <svg viewBox="0 0 25 25">
                            <polyline className="checkSvg" points="23,3 8,20 1,12" />
                        </svg>
                    </span>
                    NCD 350 for crops below 2 acres
                </Control>
                <Control>
                    <input type="checkbox" onChange={() => props.changeCheckedStatus("over2")} />
                    <span className="checkmark">
                        <svg viewBox="0 0 25 25">
                            <polyline className="checkSvg" points="23,3 8,20 1,12" />
                        </svg>
                    </span>
                    NCD 550 for crops above 2 acres
                </Control>
                <Row style={{ borderTop: '1px solid hsla(0,0%,0%,0.2)', marginTop: '30px', paddingTop: '30px'}}>
                    <Label>Total amount to be paid: </Label>
                    <StyledInput type="text" value={'NCD ' + props.totalCost} placeholder="NCD" />
                </Row>
                {props.clientSecret === 'Error' &&
                    <div style={{ fontSize: '0.7em', color: 'red' }}>
                        There was an issue connecting to Stripe services. Please try again.
                </div>}
                <Row><SubmitButton>{props.isLoading ? <FontAwesomeIcon className="spinnerAnim" icon={faCircleNotch} /> : 'Payment Information'}</SubmitButton></Row>
            </form>
        </Container>
    )
};


export default ItemSelectionForm;