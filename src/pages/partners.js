import React from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";

import Layout from "../components/layout";
import Company from "../components/company-card";
import { Logos as logos } from "../data/assets";


const Container = styled.div`
margin-bottom: 100px;
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
flex-wrap: wrap;
`;

const Button = styled.button`
width: 150px;
border: 1px solid #fd6927;
border-radius: 3px;
background-color: #fd6927;
font-size: 16px;
text-align: center;
padding: 5px;
color: #fff;
margin: 1em 0;
cursor: pointer;
-webkit-transition: 0.25s;
-moz-transition: 0.25s;
-o-transition: 0.25s;
transition: 0.25s;

:active, :hover {
    background-color: #E55616;
}
`;

const Title = styled.h1`
margin-bottom: 1em;
margin-top: 1em;
&:first-child {
    margin-top: 0;
}
text-align: center;

@media only screen and (max-width: 767px){
    font-size: 32px;
}
`;

const Partners = ({location}) => {

    const handleClick = (e) => {
        navigate("/contact");
    }
    
    return (
        <Layout location={location}>
        <section style={{textAlign: "center"}}>
            <Title>Company Partners</Title>
            <Container>                
                <Company type="partner" name="Agency Carbon/Green" 
                    logo={logos.CarbonGreen} />                    
                <Company type="partner" name="SustainT&amp;T" 
                    logo={logos.SustainTnT} />                    
                <Company type="partner" name="The Resilience Fund" 
                    logo={logos.TheResilienceFund} />                
            </Container>
            
            <Title>Certified Businesses</Title>
            <Container>
                <Company type="business" name="Certified COMS" />
                <Company type="business" name="Certified COMS" />
                <Company type="business" name="Certified COMS" />
                <Company type="business" name="Certified COMS" />
                <Company type="business" name="Certified COMS" />
            </Container>

            <p style={{fontSize: "0.8em"}}>Interested in investing and helping this industry grow?<br />
            Contact us to learn how.</p>
            <Button onClick={handleClick}>Contact</Button>
        </section>
        </Layout>
    )
}

export default Partners; 