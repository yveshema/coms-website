import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from "styled-components"
import './nav.css'

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-left: 50px;
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
    closeNavIcon: file(relativePath: { eq: "icons/ui-icons/close-48.png" })
    {
        childImageSharp {
            fixed (height: 32) {
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

const Navmenu = (props) => {
    const [windowSize, changeWindowSize] = useState({
        desktop: window.matchMedia("(min-width: 768px)").matches,
        navBurger: window.matchMedia("(min-width: 1280px)").matches,
        mobileNavActive: false,
        enableSubMenu: props.location ? (props.location.pathname.includes("cultivation") || props.location.pathname.includes("transportation") || props.location.pathname.includes("processing")) : false,
        mobileSubMenuToggle: "mobileCollapse",
        openMobileSubMenu: "subNavContainer"
    });

    // Checks if the current window size is desktop or mobile
    useEffect(() => {
        function handleWindowChange() {
            changeWindowSize({
                ...windowSize,
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

    const changeNavState = () => {
        changeWindowSize({
            ...windowSize,
            mobileNavActive: !windowSize.mobileNavActive
        })
    }

    const expandSubNav = () => {
        let newToggleList = windowSize.mobileSubMenuToggle.includes("mobileCollapseActive") ? "mobileCollapse" : "mobileCollapse mobileCollapseActive";
        let newVisibleList = windowSize.openMobileSubMenu.includes("showSubNav") ? "subNavContainer" : "subNavContainer showSubNav";
        changeWindowSize({
            ...windowSize,
            mobileSubMenuToggle: newToggleList,
            openMobileSubMenu: newVisibleList
        })
    }

    return (
        <div className="navContainer">
            <div className="navWrapper">
                <div className="row" style={{ height: '100%' }}>
                    <div style={{ width: "170px" }}>
                        <Img
                            // Image is dynamically selected depending on current window size
                            fixed={windowSize.desktop ? data.desktop.childImageSharp.fixed : data.mobile.childImageSharp.fixed}
                            alt="primary logo"
                            className="navImg"
                        />
                    </div>

                    {/* Nav renders menu options in a column if desktop options are hidden and the mobile menu is on */}
                    <Nav className={!windowSize.navBurger ? windowSize.mobileNavActive ? `navMobile` : `navHidden` : {}}>
                        <Link to="/" className="link" activeClassName="linkActive">Home</Link>
                        <Link to="/about" className="link" activeClassName="linkActive">About Moringa</Link>
                        <Link to="/cultivation" className="link" activeClassName="linkActive" style={!windowSize.navBurger ? {display:"none"}: {}}>Grow Organic Moringa</Link>
                        <button className={windowSize.mobileSubMenuToggle} onClick={expandSubNav}>Grow Organic Moringa</button>
                        {/* Conditionally render submenu if currently on a url that uses it */}
                        {windowSize.enableSubMenu &&
                        <div className="subNavContainer">
                            <Link to="/cultivation" className="link sublink" activeClassName="linkActive">Cultivation</Link>
                            <Link to="/transportation" className="link sublink" activeClassName="linkActive">Transportation</Link>
                            <Link to="/processing" className="link sublink" activeClassName="linkActive">Processing</Link>
                        </div>
                        }

                        {/* Always render these options specifically for the mobile format */}
                        <div className={!windowSize.navBurger ? windowSize.openMobileSubMenu : "navHidden"}>
                            <Link to="/cultivation" className="link sublink" activeClassName="linkActive">Cultivation</Link>
                            <Link to="/transportation" className="link sublink" activeClassName="linkActive">Transportation</Link>
                            <Link to="/processing" className="link sublink" activeClassName="linkActive">Processing</Link>
                        </div>

                        <Link to="/certification" className="link" activeClassName="linkActive">Get Organic Certification</Link>
                        <Link to="/partners" className="link" activeClassName="linkActive">Partners</Link>
                        <Link to="/contact" className="link" activeClassName="linkActive">Contact</Link>
                        <div className="mobileNavBg">
                            <button className="closeNavBtn" onClick={changeNavState}>
                                <Img
                                    fixed={data.closeNavIcon.childImageSharp.fixed}
                                    alt="close navigation"
                                />
                            </button>
                        </div>

                        {/* This div darkens content below the nav while active and can be clicked to close the menu */}
                        <div className="mobileNavOverlay" onClick={changeNavState}>
                        </div>
                    </Nav>

                    <button className="hamburgBtn" onClick={changeNavState}>
                        <Img
                            fixed={windowSize.desktop ? data.hamburger.childImageSharp.fixed : data.hamburgerMobile.childImageSharp.fixed}
                            alt="hamburger"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navmenu;
