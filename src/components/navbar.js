import React from 'react';
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

const Navbar = () => {
    const data = useStaticQuery(query);

    return (
        <Container><div className="wrapper">
            <div className="container row">
                <div className="col-2">
                    <Img            
                        fluid={data.file.childImageSharp.fluid}
                        alt="primary logo"
                    />               
                </div>
                <div className="col-10 align-bottom">
                    <Nav>
                    <Link to="/" className="link">Home</Link>
                    <Link to="/about" className="link">About Moringa</Link>
                    <Link to="/cultivation" className="link">Grow Organic Moringa</Link>
                    <Link to="/certification" className="link">Get Organic Certification</Link>
                    <Link to="/partners" className="link">Partners</Link>
		            <Link to="/contact" className="link">Contact</Link>
                    </Nav>
                </div>
            </div></div>
        </Container>
);
}

const query = graphql`
    query {
        file(relativePath: { 
            eq: "logos/primary logo dark green.png"
        }) {
            childImageSharp {
                fluid {                    
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

export default Navbar;
