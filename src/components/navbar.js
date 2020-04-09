import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Container = styled.div`
height: 120px;
background-color: white;
position: fixed;
top: 0;
left: 0;
right: 0;
display: flex;
flex-direction: row;
z-index: 9;
`

const Logo = styled.div`
width: 150px;
display: flex;
flex-direction: column;
justify-content: center;
`
const Nav = styled.nav`
display: flex;
flex-direction: column;
justify-content: center;
margin: 0 auto;
`

const Navbar = () => {
    const data = useStaticQuery(query);

    return (
        <Container>
            <Logo>
                <Img            
                    fluid={data.file.childImageSharp.fluid}
                    alt="primary logo"
                />
            </Logo>
            <Nav><span>This is the navigation bar</span></Nav>
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