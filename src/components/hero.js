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
@media only screen and (max-width: 524px) {
    margin-top: 0 !important;
}
`

const Tagline = styled.div`
position: absolute;
max-width: 1200px;
width: calc(100% * 8 / 12 - 133px);
margin: 0 auto;
color: white;
font-size: 48px;
font-weight: 500;
line-height: normal;
text-shadow: 0 3px 6px rgba(0, 0, 0, 0.502);
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
@media only screen and (max-width: 769px) {
    padding: 0 30px;
    font-size: 24px;
    max-width: 100%;
}
@media only screen and (max-width: 411px) {
    display: none;
}
@media (min-width: 414px)  and (max-width: 767px) {
    padding: 0;
    width: initial;
    left: 36%;
    font-size: 21px;
    line-height: 28px;
    font-weight:400;
}


@media (min-width: 1160px)  and (max-width: 1200px) {
    max-width: 1200px;
}
`

const Hero = ({tagline, path}) => {
    return (
        <Container style={ (path === "cultivation" || path === "transportation" || path === "processing") ? {marginTop: "63px"} : {}}>          
	        <Image src={images[path]} className="hero-img"/>	
            <Tagline><span>{tagline}</span></Tagline>        
        </Container>
);
}

export default Hero;
