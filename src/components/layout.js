import React from 'react'
import PropTypes from 'prop-types'

import Navbar from './navbar'
import Hero from './hero'
import './grid.css'

import ContactEmail from './contact-email';
import Location from './contact-location';
import Phone from './contact-phone';
import Separator from './separator'

const Layout = ({ children, pageContext }) => {
  const {title} = pageContext.frontmatter;

  return (  
    <div>
      <header>
      <Navbar />
      <Hero title={title}/>
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
