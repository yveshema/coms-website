import React from "react";

import {strip_punct} from "../utils/helpers";

const Highlighter = ({ children, searchTerm }) => {
    const content = [];
    React.Children.forEach(children,(child) => {
        child.split(" ").map((word, idx) => {            
            // if (strip_punct(word).toUpperCase() === searchTerm.trim().toUpperCase()){
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