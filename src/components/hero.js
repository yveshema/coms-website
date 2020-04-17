import React from 'react';
import styled from 'styled-components';
import {Image }  from 'react-bootstrap';
import hero from '../images/heros/homepage_hero_img.jpg';

const Container = styled.div`
position: relative;
margin-top: 120px;
margin-bottom: 100px;
`

const Title = styled.div`
position: absolute;
width: 50%;
margin: 0 auto;
color: white;
font-size: 20px;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
flex-direction: row;
align-items: center;
`

const Hero = ({title}) => {
       
    return (
        <Container>          
	        <Image src={hero} fluid/>	
            <Title><span>{title}</span></Title>        
        </Container>
);
}

export default Hero;
