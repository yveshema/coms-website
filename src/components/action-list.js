import React from "react";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
@media only screen and (max-width: 769px){
    flex-direction: column;    
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