import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { navigate } from "@reach/router";

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
    check: file(relativePath: { eq: "icons/ui-icons/checkmark-48.png" })
    {
        childImageSharp {
            fixed (height: 14) {
                ...GatsbyImageSharpFixed
            }
        }
    }
}`

const Search = () => {

    const [query, setQuery] = useState("");

    const searchIcon = useStaticQuery(icon);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };
    
    const handleSearch = (e) => {
        
        if (e.key === "Enter") {
            if(query)
            navigate(`/search?q=${query}`);
        }        
    };

    return (
        <>
            <input type="text" id="search" 
                placeholder="Search..." 
                autoComplete="off"
                onKeyPress={handleSearch} 
                onChange={handleChange}
                value={query} />
            <button className="searchOpenBtn" onClick={handleSearch}>
                <Img 
                    fixed={searchIcon.search.childImageSharp.fixed}
                    alt="Search Icon"
                />
            </button>
        </>
    );    
}

export default Search;