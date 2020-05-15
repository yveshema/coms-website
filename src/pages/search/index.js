import React, { useState, useEffect, useContext } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Index } from "elasticlunr";

import Layout from "../../components/layout"; 
import { SearchContext } from "../../components/search_context";
import { navigate } from "@reach/router";
import "./search.css";
import icon from "../../images/icons/ui-icons/search-24.png";

const SearchPage = () => {
    // initialize query string and update global state
    const { query, results, updateQuery, updateResults } = useContext(SearchContext);
    const [queryString, setQueryString] = useState(query);    
    
    // Load the site index pre-built with elasticlunr
    const data = useStaticQuery(graphql`
        query SearchIndexQuery {
            siteSearchIndex {
                index
            }
        }
    `);

    const excerptify = (str, queryStr) => {      
        // Extract an excerpt from the page(s)
        // returned from the index search        
        let words = str.split(" ");        
        
        let index, idx, end;        

        // Find the first occurence of the search term
        // Attempt a 15 word excerpt starting 5 positions
        // before up to 10 positions after
        index = words.map(value => value.toUpperCase()).indexOf(queryStr.toUpperCase());        
        idx = index > 5 ? index - 5 : index;
        end = words.length > (index + 20) ? (index + 20) : words.length;

        return words.slice(idx, end ).join(" ");
    }
    
    // Perform index search whenever the value of the query changes
    useEffect(() => {     

        const search = (query) => {            
            const index = Index.load(data.siteSearchIndex.index);
            
            updateResults(() => index.search(query, { expand: true })
                .map(({ ref }) => index.documentStore.getDoc(ref))
            );
        };
        
        search(query);
    },[query]); 

    const handleSearch = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            updateQuery(queryString);
            navigate("/search");
        }
    }
    
    return (        
        <Layout>             
            <article>
                <h1>Search Results</h1>
                <section className="searchInput">
                    <input name="search"
                        value={query}
                        onChange={(e) => updateQuery(e.target.value)}
                        onKeyPress={handleSearch}
                    />
                    <button onClick={handleSearch}><img src={icon} alt="search icon" /></button> 
                </section>
                <section className="searchResults">          
                {results.length ?
                results.map(page =>(
                    <div key={page.id}>
                        <h3>
                        <Link to={"/" + page.title}>{page.title}</Link>
                        </h3>                        
                        <p>{
                            excerptify(page.content, query) ? 
                            excerptify(page.content, query).concat("...")
                            : page.tagline.concat("...")
                        }</p>
                    </div>
                )) :
                (
                    <p>No results found for that query!</p>
                )}
                </section>              
            </article>       
        </Layout>
    )    
}

export default SearchPage;