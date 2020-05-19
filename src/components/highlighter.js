import React from "react";

const Highlighter = ({ children, searchTerm }) => {
    const content = [];
    React.Children.forEach(children,(child) => {
        child.split(" ").map((word, idx) => {            
            if (word.toUpperCase() === searchTerm.toUpperCase()){
                if (idx !== 0) content.push(" ");
                content.push(<b class="highlight-search">{word}</b>);
            } else {
                if (idx !== 0) content.push(" ");
                content.push(word);
            }
        })        
    });    

    return (
        <p>{content}</p>   
    );
};

export default Highlighter;