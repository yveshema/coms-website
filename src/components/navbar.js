import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

const Container = styled.div`
height: 120px;
background-color: white;
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 9;
`

const Nav = styled.nav`
display: flex;
justify-content: space-between;
`

const logo = graphql`
query {
    mobile: file(relativePath: { eq: "logos/secondary logo dark green.png" })
    {
        childImageSharp {
            fluid {                    
                ...GatsbyImageSharpFluid
            }
        }
    }
    desktop: file(relativePath: { eq: "logos/primary logo dark green.png" })
    {
        childImageSharp {
            fluid {                    
                ...GatsbyImageSharpFluid
            }
        }
    }
}
`

const Navbar = () => {
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

    return (
        <Container><div className="wrapper">
            <div className="container row">
                <div className="col-2">
                    <Img
                        // Image is dynamically selected depending on current window size
                        fluid={windowSize.desktop ? data.desktop.childImageSharp.fluid : data.mobile.childImageSharp.fluid}
                        alt="primary logo"
                    />
                </div>
                <div className="col-10 align-bottom">
                    <Nav>
                        <Link to="/" className="link">Home</Link>
                        <Link to="/about" className="link">About Moringa</Link>
                        <Link to="/grow-moringa" className="link">Grow Organic Moringa</Link>
                        <Link to="/certification" className="link">Get Organic Certification</Link>
                        <Link to="/partners" className="link">Partners</Link>
                        <Link to="/contact" className="link">Contact</Link>
                    </Nav>
                </div>
            </div></div>
        </Container>
    );
}

export default Navbar;
