import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import Company from "../components/company-card";

const Container = styled.div`
margin-bottom: 50px;
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
flex-wrap: wrap;
@media screen and (max-width: 1023px) and (min-width: 768px){
    display:inline-block;
}
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
<<<<<<< HEAD
-webkit-transition: 0.25s;
-moz-transition: 0.25s;
-o-transition: 0.25s;
transition: 0.25s;

:active, :hover {
    background-color: #E55616;
=======
&:hover{
    background-color: #e55616;
    border: 1px solid #e55616;
>>>>>>> styling
}
`;

const Title = styled.h3`
text-align: center;
@media only screen and (max-width: 767px){
    font-size: 32px;
}
`;

const Partners = ({location}) => {
    return (
        <Layout location={location}>
        <section style={{textAlign: "center"}}>
            <Title>Company Partners</Title>
            <Container>
                <Company type="partner" name="evolve x" />
                <Company type="partner" name="Agency Carbon/Green" />
                <Company type="partner" name="SustainT&amp;T" />
                <Company type="partner" name="The Resilience Fund" />
                <Company type="partner" name="BAF" />
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
            <Button>Contact</Button>
        </section>
        </Layout>
    )
}

export default Partners;