import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Navbar from './navbar';
import Hero from './hero';
import './grid.css';
import Container from "./content-container";

import Contact from './contact-component';
import Separator from './separator';

import ContactEnvelope from '../images/icons/ui-icons/envelope.svg';
import ContactLocation from '../images/icons/ui-icons/location-icon.svg';
import ContactPhone from '../images/icons/ui-icons/phone-icon.svg';

// The navbar is fixed positioned, which would cause it to
// overlap content below it. Apply a top margin to the content
// below works well if all the pages have the same structure. Here
// we elect to use padding instead, wrapping the navbar inside a box
// with the same height as the navbar.
const PadNav = styled.div`
height: 120px;
@media screen and (max-width: 768px) {
  height: 75px;
}
`;


const Layout = ({ location, children, pageContext={} }) => {
  const [currLang, changeLanguage] = useState({
    language: typeof(Storage) !== "undefined" ? localStorage.getItem('language') : 'EN'
  });

  const {tagline, title } = pageContext.frontmatter ? pageContext.frontmatter : {tagline:'', title:''};
  
  const selectLanguage = (event) => {
    switch (event.target.value) {
      case 'EN':
        if (currLang.language === 'EN') { break; }
        changeLanguage({
          ...currLang, 
          language: 'EN'
        })
        if (typeof(Storage) !== "undefined") { localStorage.setItem('language', 'EN') }
        break;
      case 'FR':
        if (currLang.language === 'FR') { break; }
        changeLanguage({
          ...currLang,
          language: 'FR'
        })
        if (typeof(Storage) !== "undefined") { localStorage.setItem('language', 'FR') }
        break;
      default:
        break;
    }
  }

  return (  
    <div className="pagewrapper">
      <header>
      <PadNav>
      <Navbar location={location} currLang={currLang.language} selectLanguage={selectLanguage}/>
      </PadNav>
      {tagline && title && <Hero tagline={tagline} path={title} /> }
      </header>
      <Container>
        {React.Children.map(children, (child, i) => {
          if (child.props.fullwidth){
            return (
              <section className="stretch">
                {child}
              </section>
            )
          } else {
            return child;
          }
        })}
      </Container>
      {/* <div className="wrapper">            
        <div className="row">
          <div className="col-8 centre col-s">
            {children}
          </div>
        </div>          
      </div> */}
      <footer>
        <div className="wrapper">
          <div className="container align-vert">
          <Contact icon={ContactEnvelope} content='contactemail@email.com' />
          <Separator />
          <Contact icon={ContactLocation} content='Suit 111, Street Name, Zip 333 333, City Name, Country Name' />
          <Separator />
          <Contact icon={ContactPhone} content='+1 (123) 456 7890' />
        </div>
        <div>
          <p className="copyright">Copyrights | Terms and Conditions</p>
        </div></div>
      </footer>        
    </div>    
  )
} 

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
