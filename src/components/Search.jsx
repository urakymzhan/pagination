import React from 'react';
import "../App.css"

const Search = (props) => {
    return (    
         <input onChange= {props.handleChange} value={props.searchedImage} placeholder="Search for Image"/>
    )
}

export default Search;