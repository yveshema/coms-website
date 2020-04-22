import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const icon = graphql`
query {
    search: file(relativePath: { eq: "icons/ui-icons/search-48.png" })
    {
        childImageSharp {
            fixed (height: 20) {
                ...GatsbyImageSharpFixed
            }
        }
    }
}`

const SearchBar = (props) => {
    const data = useStaticQuery(icon);
    return (
        <div className="searchDiv">
            <input type="text" id="search" placeholder="Search..." autoComplete="off"/>
            <button className="searchOpenBtn">
                <Img 
                    fixed={data.search.childImageSharp.fixed}
                    alt="Search Icon"
                />
            </button>
            <button className="languageBtn">ENG <FontAwesomeIcon icon={faChevronDown} /></button>
        </div>
    )
}

export default SearchBar;