import React from 'react';
import styled from "styled-components";

const TitleStyle = styled.div`
    display: flex;
    align-items: center;
    color: #3A722E;
    font-family: 'Rubik','Roboto';
    font-weight: 500;
    text-rendering: optimizeLegibility;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    margin-top: 50px;
    @media only screen and (max-width: 767px){
        font-size: 26px;
        line-height: 31px;
        margin-top: 30px;
    }
    
    img {
        margin-bottom: 0;
        margin-right: 10px;
        max-height: 70px;
    }

    @media only screen and (max-width: 768px) {
        img {
            max-height: 48px;
            margin-right: 5px;
        }
    }
`
// Title 
const Title = (props) => {
    return (
        <TitleStyle id={props.anchorId}>
            {/* Render icon only if an icon is provided in props*/}
            {(props.icon !== undefined) &&
                <img src={props.icon} alt="Icon" />
            }
            {props.heading}
        </TitleStyle>
    )
}

export default Title;