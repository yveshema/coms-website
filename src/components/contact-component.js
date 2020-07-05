import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
color: white;
font-size: 15px;
font-weight: 300;
margin: auto;

img {    
    height: 1.2em;    
    margin-bottom: 1rem;
}
span {
    // margin-top: -1em; 
}

@media only screen and (max-width: 1200px) {
    flex-direction: row;    
    // :first-of-type { 
    //     order: 1;
    // }
    // :last-of-type { 
    //     order: 3;
    // }
    // :nth-of-type(2) { 
    //     order: 5; 
    // }
    img {
        display: inline-block;
        margin-bottom: 0;
        margin-right: 1rem;
        // margin-right: 5px;
        // height: 30px;
        // min-width: 30px;
        // max-width: 30px;
    }
}

@media only screen and (max-width: 600px) {
    width: 15em;
    margin: 16px auto;
}

// @media only screen and (max-width: 769px) {
//     :first-of-type { 
//         margin: 0 auto 0 0;
//     }
//     :last-of-type { 
//         margin: 0 0 0 auto;
//     }
// }

// @media only screen and (max-width: 675px) {
//     :first-of-type, :last-of-type { 
//         margin: 0;
//     }
//     :nth-of-type(2) {
//         margin: 0;
//     }
// }
`

const Contact = (props) => {
    return (
        <Wrapper>
            <img src={props.icon} alt="phone icon" />
            <span>{props.content}</span>
        </Wrapper>
    )
}

export default Contact;
