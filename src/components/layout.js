import React from 'react'
import PropTypes from 'prop-types'

import Navbar from './navbar'
import Hero from './hero'
//import './layout.css'

const Layout = ({ children, pageContext }) => {
  const {title} = pageContext.frontmatter;

  return (  
    <div>
      <Navbar />
      <Hero title={title}/>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: 20,          
        }}
      >            
        {children}          
      </div>        
    </div>    
  )
} 

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
