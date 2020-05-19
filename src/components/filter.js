import React, { useState, useContext } from "react";

const Filter = ({ setup }) => {

    const { selection, setSelection } = setup;

    const handleChange = (e) => {
        setSelection(e.target.value);              
    }   

    return (
        <div>
            <p>
                <input type="radio" name="filter"
                checked={selection === "COMS Home"} value= "COMS Home" 
                onChange={handleChange} />
                <label>COMS Home</label>
            </p>
            <p>
                <input type="radio" name="filter"
                checked={selection === "About Moringa"} value= "About Moringa" 
                onChange={handleChange} />
                <label>About Moringa</label>
            </p>
            <p>
                <input type="radio" name="filter"
                checked={selection === "Cultivation"} value= "Cultivation" 
                onChange={handleChange} />
                <label>Cultivation</label>
            </p>
            <p>
                <input type="radio" name="filter"
                checked={ selection === "Processing"} value= "Processing" 
                onChange={handleChange} />
                <label>Processing</label>
            </p>
            <p>
                <input type="radio" name="filter"
                checked={selection === "Transportation"} value= "Transportation" 
                onChange={handleChange} />
                <label>Transportation</label>
            </p>
            <p>
                <input type="radio" name="filter"
                checked={selection === "Get Organic Certification"} 
                value= "Get Organic Certification" 
                onChange={handleChange}/>
                <label>Certification</label>
            </p>            
        </div>
        // <div>
        //     <select multiple>
        //         <option value="COMS Home" selection={selection === "COMS Home"}>COMS Home</option>
        //     </select>
        // </div>
    );
};

export default Filter;