import React from 'react';
import styled from 'styled-components';

import Icon from '../images/ui-icons/location-48.png';

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

const Location = () => (
    <Wrapper>
        <img src={Icon} alt="message icon" />
        <span>Suit 111 Street Name, Zip 333 333, City Name, Country Name</span>
    </Wrapper>
);

export default Location;

