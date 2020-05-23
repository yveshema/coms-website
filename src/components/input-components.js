import styled from "styled-components";

export const Row = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
margin: 10px 0;
@media only screen and (max-width: 1224px){
    flex-direction: column;
}
`;

export const FormError = styled.span`
flex: 1;
color: crimson;
font-size: .8em;
font-style: italic;
text-align: left;
`;

export const InputControl = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: flex-start;
margin: 5px 10px;
`;

export const Label = styled.label`
margin: 5px 0;
display:block;
text-align: left;
font-size: .8em;
`

export const Input = styled.input`
border: 0;
border-radius: 2px;
box-shadow: 0 0 1px 1px inset #a3a3a3;
padding: 5px;
`;

export const TextArea = styled.textarea`
border: 0;
border-radius: 2px;
box-shadow: 0 0 1px 1px inset #a3a3a3;
padding: 5px;
min-height: 10em;
`;

export const Form = styled.form`
padding: 10px;
background: #fff;
`;

export const Button = styled.button`
border: 1px solid transparent;
border-radius: 1px;
background-color: transparent;
font-size: 1em;
text-align: center;
padding: 3px;
color: inherit;
cursor: pointer;
margin-top: 20px;

`;



