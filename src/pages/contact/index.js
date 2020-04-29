import React from "react";
import Layout from "../../components/layout";
import ContactForm from "../../components/contact-form";

const ContactPage = () => (
    <Layout>
        <section style={{textAlign: "center"}}>
            <h3>Contact Us</h3>
            <p style={{textAlign: "center"}}>For inquiries about organic certifications, investment opportunities and 
                anything else, send us a message. We will respond within 2 business days.
            </p>
            <ContactForm />
        </section>
    </Layout>
)

export default ContactPage;