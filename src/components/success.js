import React from "react";
import styled from "styled-components";

import icon from "../images/icons/success-icon-70px@2x.png";

/* Display success message following form submission
Accepts title and body as props */

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 5em 0;
margin: 20px 0;
background: #fff;
`;

const Icon = styled.img`
width: 4em;
`;

const Title = styled.span`
font-size: 1.5em;
margin-bottom: 1em;
`;

const Success = ({title,body}) => (
    <Container>
        <Icon src={icon} alt="success icon" />
        <Title>{title}</Title>
        <span>{body}</span>
    </Container>
);

export default Success;