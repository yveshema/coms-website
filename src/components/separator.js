import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  border-left: 1px solid white;
  height: auto;
  user-select: none;
  color: transparent;

  // @media only screen and (max-width: 1200px) {
  //   :last-of-type {
  //     order: 4;
  //     flex-basis: 100%;
  //   }
  //   height: 0;
  // }
  @media only screen and (max-width: 1200px){
    display: none;
  }
  // @media only screen and (max-width: 675px) {
  //   :first-of-type {
  //     order: 2;
  //     flex-basis: 100%;
  //   }
  // }
`;

const Separator = () => (
    <Wrapper>|</Wrapper>
);

export default Separator;