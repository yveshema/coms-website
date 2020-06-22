import React from "react";

/* Wrapper around search results excerpt.
 * takes a search term and highlights the term
 * wherever it occurs within the excerpt
 * */
const Highlighter = ({ children, searchTerm }) => {
    const content = [];
    React.Children.forEach(children,(child) => {
        child.split(" ").map((word, idx) => {            
            if (word.toUpperCase().includes(searchTerm.trim().toUpperCase())){
                if (idx !== 0) content.push(" ");
                content.push(<b class="highlight-search">{word}</b>);
            } else {
                if (idx !== 0) content.push(" ");
                content.push(word);
            }
            return word;
        })
        return child;        
    });    

    return (
        <p>{content}</p>   
    );
};

export default Highlighter;