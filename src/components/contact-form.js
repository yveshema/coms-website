import React, { useState } from "react";
import styled from "styled-components";

import Button from "./generic-button";


const Row = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
margin: 10px 0;
@media only screen and (max-width: 1224px){
    flex-direction: column;
}
`;

const FormError = styled.span`
flex: 1;
color: crimson;
font-size: .8em;
font-style: italic;
text-align: left;
`;

const InputControl = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: flex-start;
margin: 5px 10px;
`;

const Label = styled.label`
margin: 5px 0;
display:block;
text-align: left;
font-size: .8em;
`

const Input = styled.input`
border: ${props => props.noborder? 0 : "1px solid #a3a3a3"};
border-radius: 2px;
padding: 5px;
`;

const TextArea = styled.textarea`
border: 1px solid #a3a3a3;
border-radius: 2px;
padding: 5px;
min-height: 10em;
`;

const Form = styled.form`
padding: 10px;
background: #fff;

/* Hide the input and display custom button  */       
#attach-file {
    visibility: hidden;
}


label[for="attach-file"] {
     display: inline-block!important;
     width: 8rem;     
     font-size: .8rem;    
     border: 1px solid #a3a3a3;
     border-radius: 2px;
     padding: 5px 8px;
     cursor: pointer;
     position:relative;     
 }

label[for="attach-file"]:hover:before,
label[for="attach-file"]:focus:before {
    content: attr(title);
    position: absolute;
    display: inline-block;
    background: #eee;
    border: 1px solid white;
    padding: 5px;
    border-radius: 2px;
    font-size: 0.7rem;
    width: 12rem;
    top: -70px;
    left: -2px;    
    tabindex: -1;
}
`;

const SubmitButton = styled(Button)`
width: 6em;
border: 1px solid #fd6927;
background-color: #fd6927;
margin-left: auto;
margin-right: 10px;
color: #fff;
border-radius:3px;
font-size:16px;
padding:4px;

-webkit-transition: 0.25s;
-moz-transition: 0.25s;
-o-transition: 0.25s;
transition: 0.25s;

:active, :hover {
    background-color: #E55616;
}
`;


const ContactForm = ({ onSuccess }) => {
    const tooltip = `Our company will start accepting
documents in the near future,
when we are fully operational.`;

    const [inputs, setInputs] = useState({
        fname: "",
        lname: "",
        email: "",
        tel: "",
        subj: "",
        msg: "",        
    });

    const [errors, setErrors] = useState({
        fname: "",
        lname: "",
        email: "",
        tel: "",
        subj: "",
        msg: "",
    });

    const errorMessages = {
        fname: "Invalid firstname",
        lname: "Invalid lastname",
        email: "The email address is incorrect",
        tel: "The phone number is incorrect",
        subj: "The subject must be at least 2 letters long",
        msg: "The message must be at least 8 letters long",
    }

    // Define a minimal set of rules to validate inputs against
    const rules = {
        fname: /(\w.*){2,}/,    // disallow less than 2 characters in the name
        lname: /(\w.*){2,}/,
        email: /^[^\s\\]+@\w+\.[a-z]{2,3}$/, //disallow spaces and slashes
        tel: /^(\d{3}-\d{3}-\d{4})?$/,         // North American format. Should be revised        
        subj: /(\w.*){2,}/,     // disallow less than 4 characters in subject or message body
        msg: /(\w.*){8,}/,
    };

    // Returns true if all input values are valid
    // Returns false otherwise
    const validateInputs = () => {
        // Attempts of validate each input
        // return value
        let valid = true;        
        
        // Check validity of one input value
        function validate(rule,value){
            return rule.test(value);
        }

        for (const key in inputs){                    
            // Update state with suitable error message if validation fails
            if (!validate(rules[key],inputs[key])){                               
                setErrors((errors) => ({
                    ...errors,
                    [key]: errorMessages[key],
                }));
                valid = false;                
            }
        }
        
        return valid;
    }

    // Reset error object when input changes
    const clearError = (key) => {
       setErrors((errors) => ({
           ...errors,
           [key]: "",
       }));
    }

    const handleChange = (e) => {
        const key = e.target.id;
        let value = e.target.value;
        if (e.target.id === "tel") {
            value = formatPhoneNumber(e.target.value);
        }
        setInputs((prevInputs) => ({            
                ...prevInputs,
                [key]: value,           
        }));
        clearError(key);        
    }

    const formatPhoneNumber = (str) => {
        if (str.length === 3){
            str += "-";
        }
        if (str.length === 7) {
            str += "-";
        }
        return str;
    }

    const handleBlur = (e) => {
        let value, key;
        value = e.target.value ? e.target.value : "";
        key = e.target.id;

        if(value && !rules[key].test(value)){
            setErrors((errors) => ({
                ...errors,
                [key]: errorMessages[key],
            }));             
        }
    }

    const post = async (data) => {
        const {url} = data;

        delete data.url;

        const params = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        const response = await fetch(url, params);

        if (response.status < 200 && response.status >= 300) {
            const res = await response.json();

            throw new Error(res);
        }

        return response.json();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let validated = validateInputs();
        if (validated) {
            let email, name, subject, content, data, url, forward;
            email = inputs.email;
            name = `${inputs.fname} ${inputs.lname}`;
            subject = inputs.subj;
            content = inputs.msg;            
            url = "https://qcfd2jvbpc.execute-api.us-west-2.amazonaws.com/dev/email/send";
            forward = false;

            data = {
                url,
                email,
                name,
                subject,
                content,
                forward
            };
            

            post(data)
                .then((res) => {
                    console.log(res);
                    alert("Message Sent!");
                    onSuccess(true);
                })
                .catch(error => {
                    alert(error.message);
                });
        }        
    }

    
    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <InputControl>
                    <Label>First Name*</Label>
                    <Input type="text" id="fname" value={inputs.fname}
                    onChange={handleChange} placeholder="First Name" required
                    onBlur={handleBlur} />
                    <FormError>{errors.fname}</FormError>                    
                </InputControl>
                <InputControl>
                    <Label>Last Name*</Label>
                    <Input type="text" id="lname" value={inputs.lname}
                    onChange={handleChange} placeholder="Last Name" required 
                    onBlur={handleBlur} />
                    <FormError>{errors.lname}</FormError>
                </InputControl>                
            </Row>            
            <Row>
                <InputControl>
                    <Label>Email address*</Label>
                    <Input type="email" id="email" value={inputs.email}
                    onChange={handleChange} placeholder="email@email.com" required 
                    onBlur={handleBlur} />
                    <FormError>{errors.email}</FormError>
                </InputControl>
                <InputControl>
                    <Label>Phone Number</Label>
                    <Input type="tel" id="tel" maxLength="12" value={inputs.tel}
                    onChange={handleChange} placeholder="XXX-XXX-XXXX" 
                    onBlur={handleBlur} />
                    <FormError>{errors.tel}</FormError>
                </InputControl>                
            </Row>            
            <Row>
                <InputControl>
                    <Label>Subject*</Label>
                    <Input type="text" id="subj" value={inputs.subj}
                    onChange={handleChange} placeholder="Message subject"required 
                    onBlur={handleBlur} />
                    <FormError>{errors.subj}</FormError>
                </InputControl>                                
            </Row>
            <Row>
                <InputControl>
                    <Label>Message*</Label>
                    <TextArea type="text" id="msg" value={inputs.msg}
                    onChange={handleChange} placeholder="Your message goes here..." required
                    onBlur={handleBlur}>
                    Please enter your message here ...
                    </TextArea> 
                    <FormError>{errors.msg}</FormError>
                </InputControl>                              
            </Row>
           
            <Row>
                 <InputControl>
                    <Label htmlFor="attach-file" title={tooltip}>+ Attach a file</Label>
                    <Input type="file"  id="attach-file"  disabled />
                </InputControl>
                
             </Row>
            <Row><SubmitButton>Send</SubmitButton></Row>
        </Form>
    );
};

export default ContactForm;
