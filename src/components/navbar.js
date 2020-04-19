import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

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
                <Link to="/" className="link">Home</Link>
                <Link to="/about" className="link">About Moringa</Link>
                <Link to="/grow-moringa" className="link">Grow Organic Moringa</Link>
                <Link to="/certification" className="link">Get Organic Certification</Link>
                <Link to="/partners" className="link">Partners</Link>
                <Link to="/contact" className="link">Contact</Link>
            </div></div>
        </div>
    );
}

export default Navmenu;
