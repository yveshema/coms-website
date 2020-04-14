import React from 'react';
import styled from 'styled-components';

import Icon from '../images/ui-icons/call-48.png';

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
color: white;
font-size: 18px;
img {
    width: 1em;    
}
span {
    font-size: .8em;
    margin-top: -1em; 
}
`;

const Phone = () => (
    <Wrapper>
        <img src={Icon} alt="call icon" />
        <span>+1(123) 456 7890</span>
    </Wrapper>
);

export default Phone;

