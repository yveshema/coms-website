import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ParallaxImg = styled.img`
min-height: 350px;
width: 100%;
margin-bottom: 0;
transform-origin: bottom;

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
        return _ => {
            window.removeEventListener('scroll', handleParallax);
        }
	//eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleParallax = () => {
        changeImgSize({
            ...imgSize,
            currScroll: document.documentElement.scrollTop
        })
    }

    const offset = (path, currWidth) => {
        if (path === 'home') {
            return -((currWidth - 1050) * 0.3)
        } else {
            return -(((currWidth - 1050) * 0.3) + 135)
        }
    }

    // This parallax uses the current scroll position to determine the parallax scroll position
    // The effect is disabled for tablet and mobile breakpoints for compatibility and performance
    return (
        <ParallaxImg alt="hero" src={props.image} style={!props.tablet ? { transform: `translate3D(0, ${imgSize.currScroll * 0.4 + offset(props.path, props.currWidth)}px, 0)` } : {}} />
    );

}

export default ParallaxHero;
