import React, { useState } from 'react';
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
    check: file(relativePath: { eq: "icons/ui-icons/checkmark-48.png" })
    {
        childImageSharp {
            fixed (height: 20) {
                ...GatsbyImageSharpFixed
            }
        }
    }
}`

const SearchBar = (props) => {
    const [searchState, changeSearch] = useState({
        searchBarVisible: props.currWidth,
        languageDropdownVisible: false
    })

    const openSearchBar = () => {
        changeSearch({
            ...searchState,
            searchBarVisible: !searchState.searchBarVisible
        })
    }

    const openLanguageOptions = () => {
        changeSearch({
            ...searchState,
            languageDropdownVisible: !searchState.languageDropdownVisible
        })
    }

    const data = useStaticQuery(icon);
    return (
        <div className="searchDiv">
            <input type="text" id="search" style={searchState.searchBarVisible ? {display: "block"} : {display: "none"}} placeholder="Search..." autoComplete="off"/>
            <button className="searchOpenBtn" onClick={openSearchBar}>
                <Img 
                    fixed={data.search.childImageSharp.fixed}
                    alt="Search Icon"
                />
            </button>
            <button className="languageBtn" onClick={openLanguageOptions}>
                ENG <FontAwesomeIcon icon={searchState.languageDropdownVisible ? faChevronUp : faChevronDown} />
            </button>
            <div className="dropdownSubMenu languageOptionDiv" style={searchState.languageDropdownVisible ? {display: "block", maxWidth: "100px", top: "30px"} : {display: "none"}}>
                <button className="languageOptionBtn">English</button>
                <button className="languageOptionBtn">Fran&ccedil;ais</button>
            </div>
        </div>
    )
}

export default SearchBar;