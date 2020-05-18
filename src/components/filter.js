import React, { useState, useContext } from "react";

import { SearchContext } from "./search_context";

const Filter = () => {

    const [selected, setSelected] = useState("");
    const { results, updateFilteredResults } = useContext(SearchContext);

    const handleChange = (e) => {
        setSelected(e.target.value);
        updateFilteredResults(filterResults(selected));      
    }

    const filterResults = (criterion) => {
        const filteredResults = results.filter(
            (item) => {
                return item.title === criterion;
            }
        )

        return filteredResults;
    }

    console.log(selected);

    return (
        <div>
            <p>
                <input type="radio" name="filter"
                checked={selected === "COMS Home"} value= "COMS Home" 
                onChange={handleChange} />
                <label>COMS Home</label>
            </p>
            <p>
                <input type="radio" name="filter"
                checked={selected === "About Moringa"} value= "About Moringa" 
                onChange={handleChange} />
                <label>About Moringa</label>
            </p>
            <p>
                <input type="radio" name="filter"
                checked={selected === "Cultivation"} value= "Cultivation" 
                onChange={handleChange} />
                <label>Cultivation</label>
            </p>
            <p>
                <input type="radio" name="filter"
                checked={ selected === "Processing"} value= "Processing" 
                onChange={handleChange} />
                <label>Processing</label>
            </p>
            <p>
                <input type="radio" name="filter"
                checked={selected === "Transportation"} value= "Transportation" 
                onChange={handleChange} />
                <label>Transportation</label>
            </p>
            <p>
                <input type="radio" name="filter"
                checked={selected === "Get Organic Certification"} 
                value= "Get Organic Certification" 
                onChange={handleChange}/>
                <label>Certification</label>
            </p>            
        </div>
        // <div>
        //     <select multiple>
        //         <option value="COMS Home" selected={selected === "COMS Home"}>COMS Home</option>
        //     </select>
        // </div>
    );
};

export default Filter;