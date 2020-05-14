import React, { useState, useEffect } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Index } from "elasticlunr";

import Layout from "../../components/layout"; 
import Search from "../../components/search";

const SearchPage = ({location}) => { 
    // Get the search term from the query parameters
    const params = new URLSearchParams(location.search.slice(1));
    const query = params.get("q") || "";

    // Results of the index search
    const [results, updateResults] = useState([]);

    // Load the site index pre-built with elasticlunr
    const data = useStaticQuery(graphql`
        query SearchIndexQuery {
            siteSearchIndex {
                index
            }
        }
    `);
    
    const excerptify = (str, queryStr) => {
        
        // Need a better way of dealing with this.
        // Basically the goal is to remove the frontmatter
        // and the module imports from the content
        const strFilter = (newStr, start) => {
            const strArr = newStr.split("\n");
            const filtered =  strArr.filter((item) => {
                return !item.trim().startsWith(start)
            });
            return filtered.join("\n");
        };

        str = strFilter(str,"import");
        str = strFilter(str,"---");
        str = strFilter(str,"tagline:");
        str = strFilter(str,"title:");
        str = strFilter(str,"excerpt:");
        str = strFilter(str,"#"); 
        
        const strArr = str.replace(/(<([^>]+)>)/ig,"").split(" ");        
        
        let index, idx, end;
        index = strArr.indexOf(queryStr);
        
        idx = index > 5 ? index - 5 : index;
        end = strArr.length > (index + 10) ? (index + 10) : strArr.length;
        
        return strArr.slice(idx, end ).join(" ");
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

    return (        
        <Layout>             
            <section>
                <div><Search /></div>            
                {results.map(page => (
                    <div key={page.id}>
                        <h3>
                        <Link to={"/" + page.title}>{page.title}</Link>
                        </h3>                        
                        <p>{
                        excerptify(page.content, query)?
                        excerptify(page.content,query).concat("...")
                        : page.excerpt.split(" ").slice(0,20).join(" ").concat("...")}</p>
                    </div>
                ))}            
            </section>       
        </Layout>
    )    
}

export default SearchPage;