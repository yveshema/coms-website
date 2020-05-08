import React from "react";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-top:30px;
margin-bottom:30px;
@media only screen and (max-width: 769px){
    flex-direction: column;    
}
@media screen and (max-width: 1023px) and (min-width: 768px){
    display: inline-block!important;
    width: 100%;
}

@media only screen and (max-width: 1224px){
    display: block;
}
`;

const ActionList = ({children}) => (
    <Container>
        {children}
    </Container>
);

export default ActionList;