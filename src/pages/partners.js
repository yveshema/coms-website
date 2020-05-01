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
`;

const Button = styled.button`
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

const Title = styled.h3`
text-align: center;
`;

const Partners = () => {
    return (
        <Layout>
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