import React from "react";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 20px 0 0;
`;

const Placeholder = styled.div`
width: 100px;
height: 100px;
display:flex;
justify-content: center;
align-items: center;
background: #fff;
box-shadow: 2px 2px 2px #555;
margin-bottom: 10px;
`;

const Label = styled.span`
font-size: .8em;
font-weight: medium;
`;

// Component to represent a business or company
// received type, name and logo as props
const Company = ({type, name, logo}) => {
    return (
        <Container>
            {logo? 
            <img src={logo} alt={name} />
            : <Placeholder>Logo</Placeholder>
            }
            <Label>{name}</Label>
        </Container>
    );
};

export default Company;