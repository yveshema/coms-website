import React, { useEffect, useContext } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Index } from "elasticlunr";

import Layout from "../../components/layout"; 
import { SearchContext } from "../../components/search_context";
import { navigate } from "@reach/router";
import "./search.css";
import icon from "../../images/icons/search-24.png";
import Highlighter from "../../components/highlighter";

import { snapshot } from "../../utils/helpers";

const SearchPage = () => {
    // initialize query string and update global state
    const { query, results, updateQuery, updateResults } = useContext(SearchContext);   
    
    // Load the site index pre-built with elasticlunr
    const data = useStaticQuery(graphql`
        query SearchIndexQuery {
            siteSearchIndex {
                index
            }
        }
    `);

    // Perform index search whenever the value of the query changes
    useEffect(() => {     

        const search = (query) => {            
            const index = Index.load(data.siteSearchIndex.index);
            
            updateResults(() => index.search(query, 
                {
                    fields: {
                        content: {boost: 1}
                    },
                    expand: true 
                }
                ).map(({ ref }) => index.documentStore.getDoc(ref))                
            );
        };        
        search(query);
       
    },[query]);     

    const handleSearch = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            updateQuery(e.target.value);
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
                {results.length > 0 ?
                results.map(page =>(
                    <div key={page.id}>
                        <h3>
                        <Link to={ page.path }>{page.title}</Link> 
                        </h3> 
                        <Highlighter searchTerm={query}>
                            { snapshot(page.content,query).concat("...") }
                        </Highlighter>                       
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