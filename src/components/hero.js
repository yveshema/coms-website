import React from 'react';
import styled from 'styled-components';

const images = {
    home: require("../images/heros/homepage-hero-100.jpg"),
    about: require("../images/heros/About-moringa-hero-100.jpg"),
    cultivation: require("../images/heros/Cultivation-hero-100.jpg"),
    transportation: require("../images/heros/transportation-hero-100.jpg"),
    processing: require("../images/heros/processing-hero-100.jpg"),
    certification: require("../images/heros/certificate-hero-100.jpg"),
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
max-width: 768px;
width: 100%;
margin: 0 auto;
color: white;
font-size: 48px;
font-weight: 500;
line-height: normal;
text-shadow: 0 3px 6px rgba(0, 0, 0, 0.502);
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
@media screen and (max-width: 1023px) and (min-width: 768px){
    padding: 0 70px!important;
}
@media only screen and (max-width: 768px) {
    padding: 0 30px;
    font-size: 24px;
    max-width: 100%;
}
@media only screen and (max-width: 767px){
  display:none;
}
@media only screen and (max-width: 400px) {
    display: none;
}
`

const Hero = ({tagline, path}) => {
    return (
        <Container style={ (path === "cultivation" || path === "transportation" || path === "processing") ? {marginTop: "63px"} : {}}>
            <div className="hero-img" style={{ backgroundImage: `url(${images[path]})` }}></div>
            <Tagline><span>{tagline}</span></Tagline>
        </Container>
);
}

export default Hero;
