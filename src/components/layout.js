import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Navbar from './navbar'
import Hero from './hero'
//import './layout.css'

const Layout = ({children}) => {
  const data = useStaticQuery(pageQuery);

  //console.log(data);

  return (  
    <div>
      <Navbar />
      <Hero title={data.mdx.frontmatter.title}/>
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

export const pageQuery = graphql`
query {
  mdx {
    frontmatter {
      title
    }
  }
}
`
export default Layout
