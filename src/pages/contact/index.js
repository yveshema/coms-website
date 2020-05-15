import React, { useState } from "react";
import Layout from "../../components/layout";
import ContactForm from "../../components/contact-form";
import Success from "../../components/success";

const ContactPage = ({location}) => {
    // Watch form submission
    const [formSubmitted, setFormSubmitted] = useState(false);

    return (
    <Layout location={location}>
        <section style={{textAlign: "center"}}>
            <h3>Contact Us</h3>
            <p style={{textAlign: "center"}}>For inquiries about organic certifications, investment opportunities and 
                anything else, send us a message. We will respond within 2 business days.
            </p>
            {formSubmitted ? 
                <Success 
                    title="Thank you for messaging us"
                    body="A confirmation email has been sent to the email address you provided."
                />
            :  <ContactForm onSuccess={setFormSubmitted} />           
            }
        </section>        
    </Layout>
)}

export default ContactPage;