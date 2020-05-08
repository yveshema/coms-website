import React from "react";

import Layout from "../../components/layout";


const SearchPage = (location) => {
    
    const params = new URLSearchParams(location.search.slice(1));
    const q = params.get("q") || "";

    

    return (        
        <Layout> 
            
            <p>You searched for: "{q}"</p>
            
        </Layout>
    )    
}

export default SearchPage;