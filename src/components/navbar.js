import React, { useState, useEffect } from 'react';
import AnimateHeight from 'react-animate-height';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import Img from 'gatsby-image';
import styled from "styled-components"
import './nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './search-bar';

import DesktopLogo from '../images/logos/COMS_desktop_logo.svg';
import MobileLogo from '../images/logos/COMS_mobile_logo.svg';

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-left: 50px;
`

const logo = graphql`
query {
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
            fixed (height: 17) {
                ...GatsbyImageSharpFixed
            }
        }
    }
}
`

const Navmenu = (props) => {
    const [windowSize, changeWindowSize] = useState({
        firstLoad: true,
        currScroll: 0,
        hideNav: false,
        desktop: null,
        navBurger: null,
        mobileNavActive: false,
        enableSubMenu: props.location ? (props.location.pathname.includes("cultivation") || props.location.pathname.includes("transportation") || props.location.pathname.includes("processing")) : false,
        mobileSubMenuToggle: props.location ? (props.location.pathname.includes("cultivation") || props.location.pathname.includes("transportation") || props.location.pathname.includes("processing")) : false,
        openCultivationSubMenu: props.location ? props.location.pathname.includes("cultivation") : false,
        openProcessingSubMenu: props.location ? props.location.pathname.includes("processing") : false
    });

    // Performs new check on window size every time the window size is changed
    useEffect(() => {
        window.addEventListener('resize', handleWindowChange);
        return _ => {
            window.removeEventListener('resize', handleWindowChange);
        }
    })

    useEffect(() => {
        window.addEventListener('scroll', handleWindowScroll);
        return _ => {
            window.removeEventListener('scroll', handleWindowScroll);
        }
    })

    // Run once after component mounts to determine current window size
    useEffect(() => {
        handleWindowChange();
    }, [])

    const data = useStaticQuery(logo);
    let currPathHash = props.location ? props.location.hash : "undefined";

    // Checks if the current window size is desktop or mobile
    const handleWindowChange = () => {
        changeWindowSize({
            ...windowSize,
            desktop: (typeof window !== 'undefined') ? window.matchMedia("(min-width: 769px)").matches : null,
            navBurger: (typeof window !== 'undefined') ? window.matchMedia("(min-width: 1051px)").matches : null
        });
    }

    const handleWindowScroll = () => {
        let newScrollPos = document.documentElement.scrollTop;

        // Trigger when user scrolls down
        if (windowSize.currScroll < newScrollPos) {
            // Update the current logged scroll position
            changeWindowSize({...windowSize, currScroll: newScrollPos})
            // Trigger if new position is greater than 120 and navbar is currently visible
            if (newScrollPos > 120 && !windowSize.hideNav) {
                changeWindowSize({...windowSize, hideNav: true});
            }
            // Trigger when user scrolls up
        } else if (windowSize.currScroll > newScrollPos) {
            changeWindowSize({...windowSize, currScroll: newScrollPos});
            // Trigger if the navbar is currently invisible
            if (windowSize.hideNav) {
                changeWindowSize({...windowSize, hideNav: false});
            } 
        }


    }

    // Sets visibility state of the slide out nav column
    const changeNavState = () => {
        changeWindowSize({
            ...windowSize,
            mobileNavActive: !windowSize.mobileNavActive,
            firstLoad: false
        })
    }

    // Expand nav column options for 'Grow Organic Moringa'
    const expandSubNav = () => {
        changeWindowSize({
            ...windowSize,
            mobileSubMenuToggle: !windowSize.mobileSubMenuToggle
        })
    }

    // Expand nav column options for 'Cultivation'
    const expandCultivationMenu = () => {
        changeWindowSize({
            ...windowSize,
            openCultivationSubMenu: !windowSize.openCultivationSubMenu
        })
    }

    // Expand nav column options for 'Processing'
    const expandProcessingMenu = () => {
        changeWindowSize({
            ...windowSize,
            openProcessingSubMenu: !windowSize.openProcessingSubMenu
        })
    }

    return (
        <div className="navContainer" style={windowSize.hideNav ? {top: '-120px'} : {}}>
            <div className="navWrapper">
                <div className="row" style={{ height: '100%', padding: '0' }}>

                    <Link to="/" style={{ minWidth: "140px", display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: '1' }}>
                        <img src={windowSize.desktop ? DesktopLogo : MobileLogo} alt="logo" className="navImg" />
                    </Link>

                    {/* Main Navbar */}
                    {/* Nav renders menu options in a column if desktop options are hidden and the mobile menu is on */}
                    <Nav className={!windowSize.navBurger ? windowSize.mobileNavActive ? `navMobile navSlideIn` : !windowSize.firstLoad ? `navMobile navSlideOut` : `navMobile` : {}} style={{top: '0'}}>
                        <Link to="/" className="link" activeClassName="linkActive">Home</Link>
                        <Link to="/about" className="link" activeClassName="linkActive">About Moringa</Link>
                        <Link to="/cultivation" className={windowSize.enableSubMenu ? "link linkActive" : "link"} style={!windowSize.navBurger ? { display: "none" } : {}}>
                            Grow Organic Moringa {!windowSize.enableSubMenu ? <FontAwesomeIcon icon={faChevronDown} /> : ''}

                            {/* Renders this sub menu when not on a cultivation page. Adds a drop down menu to the 'Grow Organic Moringa' nav option on desktop */}
                            {!windowSize.enableSubMenu &&
                                <div className="desktopDropdown">
                                    <Link to="/cultivation" className="bookmarkLink" activeClassName="bookmarkActive">
                                        Cultivation <FontAwesomeIcon icon={faChevronRight} />
                                        <div className="desktopSubDropdown">
                                            <AnchorLink to="/cultivation#site-selection" className={currPathHash === "#site-selection" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Site Selection</AnchorLink>
                                            <AnchorLink to="/cultivation#soil-preparation" className={currPathHash === "#soil-preparation" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Soil Preparation</AnchorLink>
                                            <AnchorLink to="/cultivation#propagation" className={currPathHash === "#propagation" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Propagation</AnchorLink>
                                            <AnchorLink to="/cultivation#planting" className={currPathHash === "#planting" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Planting</AnchorLink>
                                            <AnchorLink to="/cultivation#care" className={currPathHash === "#care" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Caring For The Plant</AnchorLink>
                                            <AnchorLink to="/cultivation#pests-and-diseases" className={currPathHash === "#pests-and-diseases" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Pest &amp; Disease Control</AnchorLink>
                                        </div>
                                    </Link>
                                    <Link to="/transportation" className="bookmarkLink" activeClassName="bookmarkActive">Transportation</Link>
                                    <Link to="/processing" className="bookmarkLink" activeClassName="bookmarkActive">
                                        Processing <FontAwesomeIcon icon={faChevronRight} />
                                        <div className="desktopSubDropdown">
                                            <AnchorLink to="/processing#leaves" className={currPathHash === "#leaves" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Processing Leaves</AnchorLink>
                                            <AnchorLink to="/processing#drying" className={currPathHash === "#drying" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Drying</AnchorLink>
                                            <AnchorLink to="/processing#packaging" className={currPathHash === "#packaging" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Packaging</AnchorLink>
                                        </div>
                                    </Link>
                                </div>}

                        </Link>
                        <button className={windowSize.mobileSubMenuToggle ? "mobileCollapse mobileCollapseActive" : "mobileCollapse"} onClick={expandSubNav}>
                            Grow Organic Moringa  <FontAwesomeIcon icon={windowSize.mobileSubMenuToggle ? faChevronUp : faChevronDown} />
                        </button>

                        {/* Always render these options specifically for the mobile format */}
                        <AnimateHeight duration={300} height={windowSize.mobileSubMenuToggle ? "auto" : 0} className={!windowSize.navBurger ? "subNavContainer" : "navHidden"}>
                            <button
                                className={windowSize.openCultivationSubMenu ? "sublink subMenuCollapse" : "sublink"}
                                style={{ paddingTop: '20px' }}
                                onClick={expandCultivationMenu}>
                                Cultivation <FontAwesomeIcon icon={windowSize.openCultivationSubMenu ? faChevronUp : faChevronDown} />
                            </button>
                            <AnimateHeight duration={300} height={windowSize.openCultivationSubMenu ? "auto" : 0}>
                                <div className="growingSubMenu">
                                    <AnchorLink to="/cultivation#site-selection" className={currPathHash === "#site-selection" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Site Selection</AnchorLink>
                                    <AnchorLink to="/cultivation#soil-preparation" className={currPathHash === "#soil-preparation" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Soil Preparation</AnchorLink>
                                    <AnchorLink to="/cultivation#propagation" className={currPathHash === "#propagation" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Propagation</AnchorLink>
                                    <AnchorLink to="/cultivation#planting" className={currPathHash === "#planting" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Planting</AnchorLink>
                                    <AnchorLink to="/cultivation#care" className={currPathHash === "#care" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Caring For The Plant</AnchorLink>
                                    <AnchorLink to="/cultivation#pests-and-diseases" className={currPathHash === "#pests-and-diseases" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Pest &amp; Disease Control</AnchorLink>
                                </div>
                            </AnimateHeight>
                            <Link to="/transportation" className="sublink" activeClassName="linkActive">Transportation</Link>
                            <button
                                className={windowSize.openProcessingSubMenu ? "sublink subMenuCollapse" : "sublink"}
                                style={{ paddingBottom: '20px' }}
                                onClick={expandProcessingMenu}>
                                Processing <FontAwesomeIcon icon={windowSize.openProcessingSubMenu ? faChevronUp : faChevronDown} />
                            </button>
                            <AnimateHeight duration={300} height={windowSize.openProcessingSubMenu ? "auto" : 0}>
                                <div className="growingSubMenu">
                                    <AnchorLink to="/processing#leaves" className={currPathHash === "#leaves" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Processing Leaves</AnchorLink>
                                    <AnchorLink to="/processing#drying" className={currPathHash === "#drying" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Drying</AnchorLink>
                                    <AnchorLink to="/processing#packaging" className={currPathHash === "#packaging" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Packaging</AnchorLink>
                                </div>
                            </AnimateHeight>
                        </AnimateHeight>

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
                        <div className={windowSize.mobileNavActive ? "mobileNavOverlay overlayShow" : "mobileNavOverlay"} onClick={changeNavState}>
                        </div>
                    </Nav>

                    {/* Desktop/Tablet Submenu for Cultivation, Transportation, and Processing Pages */}
                    {/* Conditionally render submenu if currently on a url that uses it */}
                    {windowSize.enableSubMenu &&
                        <div className="extraNavOptionContainer" style={windowSize.hideNav ? {top: '-120px'} : {}}>
                            <Link to="/cultivation" className="extraNavLink extraNavOptions" activeClassName="linkActive">
                                Cultivation <FontAwesomeIcon icon={faChevronDown} />
                                <div className="dropdownSubMenu">
                                    <AnchorLink to="/cultivation#site-selection" className={currPathHash === "#site-selection" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Site Selection</AnchorLink>
                                    <AnchorLink to="/cultivation#soil-preparation" className={currPathHash === "#soil-preparation" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Soil Preparation</AnchorLink>
                                    <AnchorLink to="/cultivation#propagation" className={currPathHash === "#propagation" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Propagation</AnchorLink>
                                    <AnchorLink to="/cultivation#planting" className={currPathHash === "#planting" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Planting</AnchorLink>
                                    <AnchorLink to="/cultivation#care" className={currPathHash === "#care" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Caring For The Plant</AnchorLink>
                                    <AnchorLink to="/cultivation#pests-and-diseases" className={currPathHash === "#pests-and-diseases" ? "bookmarkLink bookmarkActive" : "bookmarkLink"} >Pest &amp; Disease Control</AnchorLink>
                                </div>
                            </Link>
                            <Link to="/transportation" className="extraNavLink extraNavOptions" activeClassName="linkActive">Transportation</Link>
                            <Link to="/processing" className="extraNavLink extraNavOptions" activeClassName="linkActive">
                                Processing <FontAwesomeIcon icon={faChevronDown} />
                                <div className="dropdownSubMenu">
                                    <AnchorLink to="/processing#leaves" className={currPathHash === "#leaves" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Processing Leaves</AnchorLink>
                                    <AnchorLink to="/processing#drying" className={currPathHash === "#drying" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Drying</AnchorLink>
                                    <AnchorLink to="/processing#packaging" className={currPathHash === "#packaging" ? "bookmarkLink bookmarkActive" : "bookmarkLink"}>Packaging</AnchorLink>
                                </div>
                            </Link>
                        </div>}

                    {/* Search bar and Language selection */}
                    <SearchBar currWidth={windowSize.desktop} hideNav={windowSize.hideNav} currLang={props.currLang} selectLanguage={props.selectLanguage} location={props.location} />
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
