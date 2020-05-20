import React from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { autoShowTooltip } from "aws-amplify";

const Container = styled.div`
display: inline-block;
flex-direction: column;
justify-content: space-around;
align-items: center;
padding: 10px;
background-color: #fff;
margin: 0 20px;
box-shadow: 3px 3px 3px #bfbababa;




@media only screen and (max-width: 1224px) {
    margin: 20px 0;
}

@media only screen and (min-width: 769px) and (max-width: 1224px){
    display:block;

    > :first-child { 
        width: 10%;             
        float: left;
        margin-right: 10px;
    }

    > :nth-child(2) {
        width: 85%;               
        float:left;
        margin-bottom: 10px;        
    }

    > :last-child {
        display: block;
        clear:both; 
        margin-top: 50px;           
    }
}
`;

const Action = styled.button`
width: 183px;
border: 1px solid #fd6927;
border-radius: 3px;
background-color: #fd6927;
font-size: 16px;
text-align: center;
padding: 7px 5px;
color: #fff;
margin: 1em 0;
cursor: pointer;
line-height:21px;
&:hover{
    background-color: #e55616; 
    border: 1px solid #e55616;
}


`;




const Text = styled.p`
text-align: center;
font-size: 16px;
line-height:24px;

@media only screen and (min-width: 769px) and (max-width: 1224px){
    text-align: left;
    margin-bottom: 0;
}


`;




const ActionCard = ({content}) => {
    const handleClick = (e) => {
        const path = `/${content.path}`;
        navigate(path);
    }

    return (
        <Container className="homeContainer">
            <div style={{textAlign:"center"}}><img style={{marginBottom:"1rem"}} src={content.icon} /></div>
            <div className="fixHeight">{content.text.map((text) => <Text>{text}</Text>)}</div>
            <div className="buttonClass"><Action onClick={handleClick}>{content.action}</Action></div>     
        </Container>
    )
};

export default ActionCard;