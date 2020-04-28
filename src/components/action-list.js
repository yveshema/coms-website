import React from "react";
import styled from "styled-components";

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 4px;
`;

const ActionList = ({children}) => (
    <Container>
        {children}
    </Container>
);

export default ActionList;