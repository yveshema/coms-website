import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Navbar from './navbar';
import Hero from './hero';
import './grid.css';

import ContactEmail from './contact-email';
import Location from './contact-location';
import Phone from './contact-phone';
import Separator from './separator';

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
  const {tagline, title } = pageContext.frontmatter ? pageContext.frontmatter : {tagline:'', title:''};

  return (  
    <div className="pagewrapper">
      <header>
      <PadNav>
      <Navbar location={location}/>
      </PadNav>
      {tagline && title && <Hero tagline={tagline} path={title} /> }
      </header>
      <div className="wrapper">            
        <div className="row">
          <div className="col-8 centre">
            {children}
          </div>
        </div>          
      </div>
      <footer>
        <div className="wrapper"><div className="container align-vert">
          <ContactEmail />
          <Separator />
          <Location />
          <Separator />
          <Phone />
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
