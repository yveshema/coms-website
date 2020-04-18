import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// const Nav = styled.nav`
// display: flex;
// justify-content: space-between;
// `

const logo = graphql`
query {
    mobile: file(relativePath: { eq: "logos/secondary logo dark green.png" })
    {
        childImageSharp {
            fixed (height: 75) {
                ...GatsbyImageSharpFixed
            }
        }
    }
    desktop: file(relativePath: { eq: "logos/primary logo dark green.png" })
    {
        childImageSharp {
            fixed (height: 100) {
                ...GatsbyImageSharpFixed
            }
        }
    }
}
`

const Navmenu = () => {
    const [windowSize, changeWindowSize] = useState({ desktop: window.matchMedia("(min-width: 768px)").matches });

    // Checks if the current window size is desktop or mobile
    useEffect(() => {
        function handleWindowChange() {
            changeWindowSize({
                desktop: window.matchMedia("(min-width: 768px)").matches
            });
        }
        window.addEventListener('resize', handleWindowChange);
        return _ => {
            window.removeEventListener('resize', handleWindowChange);
        }
    }
    )

    const data = useStaticQuery(logo);

    // return (
    //     <div className="navContainer" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
    //     <div className="wrapper">
    //         <div className="container row" style={{height: '100%'}}>
    //             <div className="col-2">
    //                 <Img
    //                     // Image is dynamically selected depending on current window size
    //                     fluid={windowSize.desktop ? data.desktop.childImageSharp.fluid : data.mobile.childImageSharp.fluid}
    //                     alt="primary logo"
    //                     className="navImg"
    //                 />
    //             </div>
    //             <div className="col-10 align-bottom" style={{paddingBottom: '20px'}}>
    //                 <Nav>
    //                     <Link to="/" className="link">Home</Link>
    //                     <Link to="/about" className="link">About Moringa</Link>
    //                     <Link to="/grow-moringa" className="link">Grow Organic Moringa</Link>
    //                     <Link to="/certification" className="link">Get Organic Certification</Link>
    //                     <Link to="/partners" className="link">Partners</Link>
    //                     <Link to="/contact" className="link">Contact</Link>
    //                 </Nav>
    //             </div>
    //         </div></div>
    //     </div>

    return (
        <Navbar bg="light" className="navContainer">
            <Navbar.Brand href="/">
                <Img
                    // Image is dynamically selected depending on current window size
                    imgStyle={{ objectFit: 'contain' }}
                    // style={{ height: windowSize.desktop ? data.desktop.childImageSharp.fixed.presentationHeight : data.mobile.childImageSharp.fixed.presentationHeight }}
                    fixed={windowSize.desktop ? data.desktop.childImageSharp.fixed : data.mobile.childImageSharp.fixed}
                    alt="primary logo"
                />
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="/" className="link">Home</Nav.Link>
                <Nav.Link href="/about" className="link">About Moringa</Nav.Link>
                <Nav.Link href="/grow-moringa" className="link">Grow Organic Moringa</Nav.Link>
                <Nav.Link href="/certification" className="link">Get Organic Certification</Nav.Link>
                <Nav.Link href="/partners" className="link">Partners</Nav.Link>
                <Nav.Link href="/contact" className="link">Contact</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Navmenu;
