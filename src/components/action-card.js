import React from "react";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
padding: 10px;
border: 1px solid #333;
background-color: #fff;
margin: 0 10px;
`;

const Action = styled.button`
background-color: #fd6927;
text-align: center;
padding: 3px;
border-radius: 3px;
color: #fff;
`;

const Text = styled.p`
text-align: center;
font-size: .8em;
`;



const ActionCard = ({content}) => (
    <Container>
        <div><img src={content.icon} /></div>
        {content.text.map((text) => <Text>{text}</Text>)}
        <Action>{content.action}</Action>
    </Container>
);

export default ActionCard;