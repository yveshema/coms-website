import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
color: white;
font-size: 15px;
font-weight: 300;
margin: auto;

img {    
    height: 1.2em;    
    margin-bottom: 1rem;
}

@media only screen and (max-width: 1200px) {
    flex-direction: row;    
    
    img {
        display: inline-block;
        margin-bottom: 0;
        margin-right: 1rem;        
    }
}

@media only screen and (max-width: 600px) {
    width: 15em;
    margin: 16px auto;
}
`;

const Contact = (props) => {
    return (
        <Wrapper>
            <img src={props.icon} alt="phone icon" />
            <span>{props.content}</span>
        </Wrapper>
    )
}

export default Contact;
