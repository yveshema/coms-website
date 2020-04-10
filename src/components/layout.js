import React from 'react'
import PropTypes from 'prop-types'

import Navbar from './navbar'
import Hero from './hero'
import './grid.css'

const Layout = ({ children, pageContext }) => {
  const {title} = pageContext.frontmatter;

  return (  
    <div>
      <header>
      <Navbar />
      <Hero title={title}/>
      </header>
      <div className="container">            
        <div className="row">
          <div className="col-8 centre">
            {children}
          </div>
        </div>          
      </div>
      <footer>
        <div className="container">Footer goes here...</div>
      </footer>        
    </div>    
  )
} 

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
