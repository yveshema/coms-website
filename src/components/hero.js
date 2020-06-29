import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ParallaxHero from './parallax-hero';

const Container = styled.div`
position: relative;
max-height: 350px;
overflow: hidden;
// margin-top: 120px;
// margin-bottom: 100px;
@media only screen and (max-width: 524px) {
    margin-top: 0 !important;
}

@media only screen and (max-width: 768px) {
    max-height: 200px
}

@media only screen and (max-width: 500px) {
    max-height: 115px;
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
    const [imgSize, changeImgSize] = useState({
        currWidth: null,
        tablet: null,
        mobile: null
    });

    // Performs new check on window size every time the window size is changed
    useEffect(() => {
        window.addEventListener('resize', handleWindowChange);
        return _ => {
            window.removeEventListener('resize', handleWindowChange);
        }
    })

    // Run once after component mounts to determine current window size
    useEffect(() => {
        handleWindowChange();
	//eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Checks if the current window size is tablet or mobile
    const handleWindowChange = () => {
        if (typeof window !== 'undefined') {
            changeImgSize({
                ...imgSize,
                currWidth: window.innerWidth,
                tablet: window.matchMedia("(max-width: 1050px)").matches,
                mobile: window.matchMedia("(max-width: 414px)").matches
            });
        }
    }

    // Objects containing different hero image sizes
    const desktopImages = {
        home: require("../images/heros/homepage-hero-1920.jpg"),
        about: require("../images/heros/About-moringa-hero-100.jpg"),
        cultivation: require("../images/heros/Cultivation-hero-100.jpg"),
        transportation: require("../images/heros/transportation-hero-100.jpg"),
        processing: require("../images/heros/processing-hero-100.jpg"),
        certification: require("../images/heros/certificate-hero-100.jpg"),
    };

    const tabletImages = {
        home: require("../images/heros/homepage-hero-768.jpg"),
        about: require("../images/heros/About-moringa-hero-100.jpg"),
        cultivation: require("../images/heros/Cultivation-hero-100.jpg"),
        transportation: require("../images/heros/transportation-hero-100.jpg"),
        processing: require("../images/heros/processing-hero-100.jpg"),
        certification: require("../images/heros/certificate-hero-100.jpg"),
    };

    const mobileImages = {
        home: require("../images/heros/homepage-hero-414.jpg"),
        about: require("../images/heros/About-moringa-hero-100.jpg"),
        cultivation: require("../images/heros/Cultivation-hero-100.jpg"),
        transportation: require("../images/heros/transportation-hero-100.jpg"),
        processing: require("../images/heros/processing-hero-100.jpg"),
        certification: require("../images/heros/certificate-hero-100.jpg"),
    };

    return (
        <Container style={ (path === "cultivation" || path === "transportation" || path === "processing") ? {marginTop: "63px"} : {}}>
            <ParallaxHero image={
            imgSize.mobile ? 
            mobileImages[path] :
            imgSize.tablet ? 
            tabletImages[path] :
            desktopImages[path]}
            tablet={imgSize.tablet}
            path={path}
            currWidth={imgSize.currWidth}
            />
            <Tagline><span>{tagline}</span></Tagline>
        </Container>
);
}

export default Hero;
