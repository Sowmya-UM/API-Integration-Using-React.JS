import React from 'react';
import {useGlobalContext} from "./Context";

const Search = () => {
  const {query, SearchPost} = useGlobalContext();
  return (
    <>
    <h1>API Integration Using React.JS</h1>
    <form>
      <div>
        <input type="text" placeholder="search here" 
        value = {query}
        onChange={(e) => SearchPost(e.target.value)}
        />
      </div>
    </form>
    </>
  )
}

export default Search
