import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ParallaxImg = styled.img`
min-height: 350px;
width: 100%;
margin-bottom: 0;

@media only screen and (max-width: 768px) {
    min-height: 200px
}

@media only screen and (max-width: 500px) {
    min-height: 115px;
}

`

const ParallaxHero = (props) => {
    const [imgSize, changeImgSize] = useState({
        currScroll: (typeof document !== 'undefined') ? document.documentElement.scrollTop : 0
    });

    useEffect(() => {
        window.addEventListener('scroll', handleParallax);
    }, [])

    const handleParallax = () => {
        changeImgSize({
            ...imgSize,
            currScroll: document.documentElement.scrollTop
        })
    }

    return (
        <ParallaxImg alt="hero" src={props.image} style={{ transform: `translate3D(0, ${imgSize.currScroll * 0.5}px, 0)` }} />
    );

}

export default ParallaxHero;