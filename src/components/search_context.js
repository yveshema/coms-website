import React, { useState, createContext } from "react";

export const SearchContext = createContext();

const Provider = ({children}) => {
    // Search state
  const [query, updateQuery] = useState("");
  // const [filter, updateFilter] = useState("");
  // Results of the index search
  const [results, updateResults] = useState([]);
  const [filteredResults, updateFilteredResults] = useState([]);

  return (
      <SearchContext.Provider value={{
        query,
        filteredResults,
        results,
        updateQuery,
        updateFilteredResults,
        updateResults
      }}>
          {children}
      </SearchContext.Provider>
  );
};

export default Provider;