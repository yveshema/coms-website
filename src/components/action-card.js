import React from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
padding: 10px;
background-color: #fff;
margin: 0 10px;
box-shadow: 2px 2px 2px #555;

@media only screen and (max-width: 1224px) {
    margin: 20px 0;
}

@media only screen and (min-width: 769px) and (max-width: 1224px){
    display:block;

    > :first-child { 
        width: 10%;             
        float: left;
        margin-right: 10px;
    }

    > :nth-child(2) {
        width: 85%;               
        float:left;
        margin-bottom: 10px;        
    }

    > :last-child {
        display: block;
        clear:both; 
        margin-top: 50px;           
    }
}
`;

const Action = styled.button`
width: 12em;
border: 1px solid #fd6927;
border-radius: 1px;
background-color: #fd6927;
font-size: 1em;
text-align: center;
padding: 3px;
color: #fff;
margin: 1em 0;
cursor: pointer;
`;

const Text = styled.p`
text-align: center;
font-size: .8em;
@media only screen and (min-width: 769px) and (max-width: 1224px){
    text-align: left;
    margin-bottom: 0;
}
`;



const ActionCard = ({content}) => {
    const handleClick = (e) => {
        const path = `/${content.path}`;
        navigate(path);
    }

    return (
        <Container>
            <div><img src={content.icon} /></div>
            <div>{content.text.map((text) => <Text>{text}</Text>)}</div>
            <Action onClick={handleClick}>{content.action}</Action>       
        </Container>
    )
};

export default ActionCard;