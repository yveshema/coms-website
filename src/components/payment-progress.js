import React from 'react';
import styled from 'styled-components';

const ProgressDiv = styled.div`
width: 100%;
max-width: 768px;
margin: auto;
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 1.5rem;

p {
    color: black;
    font-size: 1em;
    margin-bottom: 0;
}

.progressCircle {
    height: 15px;
    width: 15px;
    background-color: #C1C1C1;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 3px #C1C1C1;
    margin-right: 10px;
}

.divider {
    border-bottom: 3px solid #C1C1C1;
    flex-grow: 1;
    margin-left: 5px;
}

@media only screen and (max-width: 501px) {
    p {
        display: none;
    }
}

`


const PayProgress = (props) => {
    return(
        <ProgressDiv>
            <div 
            className="progressCircle" 
            style={props.progress >= 1 ? props.progress === 1 ? {boxShadow: '0 0 0 3px #53AB34'} : {boxShadow: '0 0 0 3px #53AB34', backgroundColor: '#53AB34'} : {}}></div>
            <p style={props.progress >= 1 ? {fontWeight: '500'} : {fontWeight: 'normal'}}>Select Items</p>
            <span className="divider" style={props.progress >= 2 ? {borderBottomColor: '#53AB34'} : {}}></span>
            <div 
            className="progressCircle"
            style={props.progress >= 2 ? props.progress === 2 ? {boxShadow: '0 0 0 3px #53AB34'} : {boxShadow: '0 0 0 3px #53AB34', backgroundColor: '#53AB34'} : {}}></div>
            <p style={props.progress >= 2 ? {fontWeight: '500'} : {fontWeight: 'normal'}}>Payment Information</p>
            <span className="divider" style={props.progress >= 3 ? {borderBottomColor: '#53AB34'} : {}}></span>
            <div 
            className="progressCircle"
            style={props.progress >= 3 ? props.progress === 3 ? {boxShadow: '0 0 0 3px #53AB34'} : {boxShadow: '0 0 0 3px #53AB34', backgroundColor: '#53AB34'} : {}}></div>
            <p style={props.progress >= 3 ? {fontWeight: '500'} : {fontWeight: 'normal'}}>Review &amp; Confirm</p>
        </ProgressDiv>
    )
}

export default PayProgress;