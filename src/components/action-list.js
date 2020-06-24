import React from "react";
import styled from "styled-components";

/* Wrapper around the action card components on the
 * home page. Lay the cards horizontally on large screens
 * and switch to vertical layout from tablet's size and below
 * */
const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-top:30px;
margin-bottom:30px;

@media screen and (max-width: 1200px) {    
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}
`;

const ActionList = ({children}) => (
    <Container>
        {children}
    </Container>
);

export default ActionList;