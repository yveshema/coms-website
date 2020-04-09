import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Container = styled.div`
position: relative;
margin-top: 120px;
`

const Title = styled.div`
position: absolute;
color: white;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`

const Hero = ({title}) => {
    const data = useStaticQuery(query);
    console.log(title);

    return (
        <Container>            
            <Img            
                fluid={data.file.childImageSharp.fluid}
                alt="primary logo"
            />  
            <Title><span>{title}</span></Title>         
        </Container>
);
}

const query = graphql`
    query {
        file(relativePath: { 
            eq: "heros/homepage-hero.jpg"
        }) {
            childImageSharp {
                fluid {                    
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

export default Hero;