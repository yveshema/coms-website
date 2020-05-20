import React, { useState, createContext } from "react";

export const SearchContext = createContext();

const Provider = ({children}) => {
    // Search state
  const [query, updateQuery] = useState("");
  
  // Results of the index search
  const [results, updateResults] = useState([]);
  
  return (
      <SearchContext.Provider value={{
        query,        
        results,
        updateQuery,        
        updateResults
      }}>
          {children}
      </SearchContext.Provider>
  );
};

export default Provider;