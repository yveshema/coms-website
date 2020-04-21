import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from "styled-components"
import './nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

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
        mobileSubMenuToggle: props.location ? (props.location.pathname.includes("cultivation") || props.location.pathname.includes("transportation") || props.location.pathname.includes("processing")) : false,
        openMobileSubMenu: props.location ? (props.location.pathname.includes("cultivation") || props.location.pathname.includes("transportation") || props.location.pathname.includes("processing")) : false,
        openCultivationSubMenu: props.location ? props.location.pathname.includes("cultivation") : false,
        openProcessingSubMenu: props.location ? props.location.pathname.includes("processing") : false
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
        changeWindowSize({
            ...windowSize,
            mobileSubMenuToggle: !windowSize.mobileSubMenuToggle,
            openMobileSubMenu: !windowSize.openMobileSubMenu
        })
    }

    const expandCultivationMenu = () => {
        changeWindowSize({
            ...windowSize,
            openCultivationSubMenu: !windowSize.openCultivationSubMenu,
        })
    }

    const expandProcessingMenu = () => {
        changeWindowSize({
            ...windowSize,
            openProcessingSubMenu: !windowSize.openProcessingSubMenu,
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
                        <Link to="/cultivation" className={windowSize.enableSubMenu ? "link linkActive" : "link"} style={!windowSize.navBurger ? { display: "none" } : {}}>Grow Organic Moringa</Link>
                        <button className={windowSize.mobileSubMenuToggle ? "mobileCollapse mobileCollapseActive" : "mobileCollapse"} onClick={expandSubNav}>
                            Grow Organic Moringa  <FontAwesomeIcon icon={windowSize.mobileSubMenuToggle ? faChevronUp : faChevronDown} />
                        </button>

                        {/* Always render these options specifically for the mobile format */}
                        <div className={!windowSize.navBurger ? windowSize.openMobileSubMenu ? "subNavContainer showSubNav" : "subNavContainer" : "navHidden"}>
                            <button
                                className={windowSize.openCultivationSubMenu ? "sublink subMenuCollapse" : "sublink"}
                                style={{ paddingTop: '20px' }}
                                onClick={expandCultivationMenu}>
                                Cultivation <FontAwesomeIcon icon={windowSize.openCultivationSubMenu ? faChevronUp : faChevronDown} />
                            </button>
                            <div className={windowSize.openCultivationSubMenu ? "growingSubMenu" : "navHidden"}>
                                <Link to="/cultivation#site-selection" className={props.location.hash === "#site-selection" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Site Selection</Link>
                                <Link to="/cultivation#soil-preparation" className={props.location.hash === "#soil-preparation" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Soil Preparation</Link>
                                <Link to="/cultivation#propagation" className={props.location.hash === "#propagation" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Propagation</Link>
                                <Link to="/cultivation#planting" className={props.location.hash === "#planting" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Planting</Link>
                                <Link to="/cultivation#care" className={props.location.hash === "#care" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Caring For The Plant</Link>
                                <Link to="/cultivation#pests-and-diseases" className={props.location.hash === "#pests-and-diseases" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Pest &amp; Disease Control</Link>
                            </div>
                            <Link to="/transportation" className="sublink" activeClassName="linkActive">Transportation</Link>
                            <button
                                className={windowSize.openProcessingSubMenu ? "sublink subMenuCollapse" : "sublink"}
                                style={{ paddingBottom: '20px' }}
                                onClick={expandProcessingMenu}>
                                Processing <FontAwesomeIcon icon={windowSize.openProcessingSubMenu ? faChevronUp : faChevronDown} />
                            </button>
                            <div className={windowSize.openProcessingSubMenu ? "growingSubMenu" : "navHidden"}>
                                <Link to="/processing#leaves" className={props.location.hash === "#leaves" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Processing Leaves</Link>
                                <Link to="/processing#drying" className={props.location.hash === "#drying" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Drying</Link>
                                <Link to="/processing#packaging" className={props.location.hash === "#packaging" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Packaging</Link>
                            </div>
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

                    {/* Conditionally render submenu if currently on a url that uses it */}
                    {windowSize.enableSubMenu &&
                        <div className="extraNavOptionContainer">
                            <Link to="/cultivation" className="extraNavLink extraNavOptions" activeClassName="linkActive">Cultivation</Link>
                            <Link to="/transportation" className="extraNavLink extraNavOptions" activeClassName="linkActive">Transportation</Link>
                            <Link to="/processing" className="extraNavLink extraNavOptions" activeClassName="linkActive">Processing</Link>
                        </div>
                    }

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
