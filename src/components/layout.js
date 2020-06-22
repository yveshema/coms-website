import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import '../styles/main.css';
import Navbar from './navbar';
import Hero from './hero';
// import './grid.css';
import Container from "./content-container";

import Contact from './contact-component';
import Separator from './separator';

import emailIcon from '../images/icons/envelope.svg';
// import ContactLocation from '../images/icons/location-icon.svg';
import phoneIcon from '../images/icons/phone-icon.svg';

// The navbar is fixed positioned, which would cause it to
// overlap content below it. Apply a top margin to the content
// below works well if all the pages have the same structure. Here
// we elect to use padding instead, wrapping the navbar inside a box
// with the same height as the navbar.
const Navbox = styled.div`
height: 120px;
@media screen and (max-width: 768px) {
  height: 75px;
}
`;


const Layout = ({ location, children, pageContext={} }) => {
  
  const [currLang, changeLanguage] = useState({
    language: typeof(Storage) !== "undefined" ? localStorage.getItem('language') : 'EN'
  });

  const {tagline, hero } = pageContext.frontmatter ? pageContext.frontmatter : {tagline:'', hero:''};
  
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
        <Navbox>
          <Navbar location={location} 
                  currLang={currLang.language} 
                  selectLanguage={selectLanguage} />
        </Navbox>
        {tagline && hero && <Hero tagline={tagline} path={hero} /> }
      </header>

      {/* Main content */}
      <Container>
        {children}        
      </Container>      
      
      <footer>
        <div>
          <div>
            <Contact icon={emailIcon} content='contactemail@email.com' />
            <Separator />
            <Contact icon={phoneIcon} content='+1 (123) 456 7890' />
          </div>
          <div>
            <p className="copyright">Copyrights | Terms and Conditions</p>
          </div>
        </div>
      </footer>        
    </div>       
  )
} 

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
