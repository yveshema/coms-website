import React from "react";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 20px 0 0;
max-height: 8em;
@media only screen and (max-width: 767px){
    width: 50%;
    margin: 0;    
    margin-bottom: 25px;
}
@media screen and (max-width: 1023px) and (min-width: 768px){
    width: 33.33%;
    margin: 10px 0px;
    float: left;
}

img {
    height: 100%;
}
`;

const Placeholder = styled.div`
width: 100px;
height: 100px;
display:flex;
justify-content: center;
align-items: center;
background: #fff;
box-shadow: 3px 3px 3px #bfbababa;
margin-bottom: 10px;
`;

const Label = styled.span`
font-size: .8em;
font-weight: medium;
@media only screen and (max-width: 767px){
    width:100px;
}
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