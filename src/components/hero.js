import React from 'react';
import styled from 'styled-components';
import {Image }  from 'react-bootstrap';

const images = {
    home: require("../images/heros/homepage_hero_img.jpg"),
    about: require("../images/heros/about_moringa_hero_img.jpg"),
    cultivation: require("../images/heros/cultivation_hero_img.jpg"),
    transportation: require("../images/heros/transportation_hero_img.jpg"),
    processing: require("../images/heros/processing_hero_img.jpg"),
    certification: require("../images/heros/get_certification.jpg"),
};

const Container = styled.div`
position: relative;
// margin-top: 120px;
// margin-bottom: 100px;
`

const Tagline = styled.div`
position: absolute;
width: 55%;
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

const Hero = ({tagline, path}) => {
    return (
        <Container>          
	        <Image src={images[path]} fluid/>	
            <Tagline><span>{tagline}</span></Tagline>        
        </Container>
);
}

export default Hero;
