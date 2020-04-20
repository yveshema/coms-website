import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from "styled-components"

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-left: 10px;
`

const logo = graphql`
query {
    mobile: file(relativePath: { eq: "logos/secondary logo dark green.png" })
    {
        childImageSharp {
            fixed (height: 50) {
                ...GatsbyImageSharpFixed
            }
        }
    }
    desktop: file(relativePath: { eq: "logos/primary logo dark green.png" })
    {
        childImageSharp {
            fixed (height: 75) {
                ...GatsbyImageSharpFixed
            }
        }
    }
    hamburger: file(relativePath: { eq: "icons/ui-icons/menu-48.png" })
    {
        childImageSharp {
            fixed (height: 48) {
                ...GatsbyImageSharpFixed
            }
        }
    }
    hamburgerMobile: file(relativePath: { eq: "icons/ui-icons/menu-48.png" })
    {
        childImageSharp {
            fixed (height: 32) {
                ...GatsbyImageSharpFixed
            }
        }
    }
}
`

const Navmenu = () => {
    const [windowSize, changeWindowSize] = useState({ 
        desktop: window.matchMedia("(min-width: 768px)").matches,
        navBurger: window.matchMedia("(min-width: 1280px)").matches
    });

    // Checks if the current window size is desktop or mobile
    useEffect(() => {
        function handleWindowChange() {
            changeWindowSize({
                desktop: window.matchMedia("(min-width: 768px)").matches,
                navBurger: window.matchMedia("(min-width: 1280px)").matches
            });
        }
        window.addEventListener('resize', handleWindowChange);
        return _ => {
            window.removeEventListener('resize', handleWindowChange);
        }
    }
    )

    const data = useStaticQuery(logo);

    return (
        <div className="navContainer" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div className="wrapper">
            <div className="row" style={{height: '100%'}}>
                <div style={{width:"170px"}}>
                    <Img
                        // Image is dynamically selected depending on current window size
                        fixed={windowSize.desktop ? data.desktop.childImageSharp.fixed : data.mobile.childImageSharp.fixed}
                        alt="primary logo"
                        className="navImg"
                    />
                </div>
                <Nav style={!windowSize.navBurger ? {justifyContent: "flex-end"} : {}}>
                    <Link to="/" className={windowSize.navBurger ? "link" : "link mobile"}>Home</Link>
                    <Link to="/about" className="link">About Moringa</Link>
                    <Link to="/grow-moringa" className="link">Grow Organic Moringa</Link>
                    <Link to="/certification" className="link">Get Organic Certification</Link>
                    <Link to="/partners" className="link">Partners</Link>
                    <Link to="/contact" className="link">Contact</Link>
                    <button className="hamburgBtn">
                        <Img
                            fixed={windowSize.desktop ? data.hamburger.childImageSharp.fixed : data.hamburgerMobile.childImageSharp.fixed}
                            alt="hamburger"
                        />
                    </button>
                </Nav>
            </div></div>
        </div>
    );
}

export default Navmenu;
