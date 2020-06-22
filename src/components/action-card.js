import React from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";

/* Card component to wrap call-for-action message
 * Contains icon, text and action button stacked on top
 * of each other on large and small screens. In tablet 
 * mode the icon is floated left
 * */
const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
padding: 10px;
background-color: #fff;
margin: 0 20px;
box-shadow: 3px 3px 3px #bfbababa;

/* Give the text area more space */
>:nth-child(2) {
    flex:2;    
}

@media only screen and (max-width: 1200px) {
    margin: 20px 0;
}

@media only screen and (min-width: 601px) and (max-width: 1200px){
    display:block;
    padding: 2em;

    >:first-child { 
        width: 4em;             
        float: left;
        margin-right: 2em;
        img {
            width: 100%;
        }
    }

    >:nth-child(2) {
        width: 60%;               
        float:left;
        margin-bottom: 10px;        
    }

    >:last-child {
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
-webkit-transition: 0.25s;
-moz-transition: 0.25s;
-o-transition: 0.25s;
transition: 0.25s;

/* Shift the button by 6em so it aligns with the text. 
 * 4 + 2 because the icon is 4em wide and has 2em right margin
 */
@media only screen and (min-width: 601px) and (max-width: 1200px){
    margin-left: 6em;
}

:active, :hover {
    background-color: #E55616;
}

`;

const Text = styled.p`
text-align: center;
font-size: 16px;
line-height:24px;

@media only screen and (min-width: 601px) and (max-width: 1200px){
    text-align: left;
    margin-bottom: 0;
}

@media only screen and (max-width: 600px){
    padding: 0 10px;
}
`;

const ActionCard = ({content}) => {
    const handleClick = (e) => {
        const path = `/${content.path}`;
        navigate(path);
    }

    return (
        <Container>
            <div style={{textAlign:"center"}}><img style={{marginBottom:"1rem"}} src={content.icon} alt={`${content.action} icon`} /></div>
            <div>{content.text.map((text) => <Text>{text}</Text>)}</div>
            <Action onClick={handleClick}>{content.action}</Action>     
        </Container>
    )
};

export default ActionCard;