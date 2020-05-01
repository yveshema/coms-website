import React from "react";
import styled from "styled-components";

// Seals
import darkGreen from "../images/seals/seal-dark-green.svg";
import black from "../images/seals/seal-black.svg";

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
padding: 3em;
background: #fff;
`

const Container = styled.div`
width: 8em;
height: 8em;
min-width:100px;
margin: 0 5px;
@media only screen and (max-width: 769px){
    visibility: ${props => props.duplicate ? 'hidden' : 'visible'}
}
`

const Seals = () => (
    <Wrapper>
        <Container><img src={darkGreen} alt="dark green seal" /></Container>
        <Container duplicate><img src={black} alt="black seal" /></Container>         
    </Wrapper>
);

export default Seals;

