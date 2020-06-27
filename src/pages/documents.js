import React from  "react";

import Layout from "../components/layout"; 
import { navigate } from "@reach/router";
import styled from 'styled-components';
import Button from '../components/generic-button';

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
h1, p {
text-align: center;
}
h1 {
margin-top: 0;
}
max-width: 30%;
padding-bottom: 100px;
@media only screen and (max-width: 900px) {
max-width: 60%;
}

@media only screen and (max-width: 700px) {
max-width: 80%;
}
@media only screen and (max-width: 600px) {
max-width: 100%;
}
`;

const ContactButton = styled(Button)`
background-color: #fd6927;
color: #fff;
width: 150px;
border-radius: 3px;
font-size: 16px;
text-align: center;
:active, :hover {
background-color: #e55616;
}
`;


const Documents  = () => {
   return (        
        <Layout>             
          <Container>
	    <h1>Application Form</h1>
	    <p>Application forms will become available in the near future,
	      when our company becomes fully operational.</p>
	    <p>To find out more, you are welcome to contact us.
	      Thank you for your interest.</p>
	    <ContactButton onClick={e => navigate('/contact')}>Contact</ContactButton>
	  </Container>
        </Layout>
    );    
}

export default Documents;
