// Context creation: acummulation of data.
//Provider: those who pass this data to the particular position.
//useContextHook(consumer):  those who recv's (or those who get this data) this data.

// useContext hook comes under Context API (both are different)

import React from "react";
import {useContext, useReducer, useEffect} from "react";
import reducer from "./reducer";

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
    isLoading: true,
    query: "CSS",
    nbPages: 0,
    page: 0,
    hits: [],
};


//Create context Api
const AppContext = React.createContext();

//crt provider function
const AppProvider = ({children}) => {

    // const [state, setstate] = useState(initialState);

    //useReducer returns an array with 2 elements (state and dispatch).
    //dispatch triggers the reducer function present inside useReducer.
    const [state, dispatch] = useReducer(reducer, initialState);

       
   

    const fetchApiData = async (url) => {
        dispatch({type: "SET_LOADING"});




        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            dispatch({
                type: "GET_STORIES",

                //If i need to add extra data to reducer along with type, the i have to write it in payload
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                },

            });
        } catch(error) {
            console.log(error);
        }
    };

    // to remove the post
    const removePost = (post_ID) => {
        dispatch({type: "REMOVE_POST", payload: post_ID});
    }

    //Search
    const SearchPost = (searchQuery) => {
        dispatch ({
            type: "SEARCH_QUERY",
            payload: searchQuery,
        });
    };

    // pagination
    const getNextPage = () => {
        dispatch({
            type: "NEXT_PAGE",
        });
    };

    const getPrevPage = () => {
        dispatch({
            type: "PREV_PAGE",
        });
    };




    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page]);



return (
    //Through AppContext i am calling provider
    <AppContext.Provider value={{...state, removePost, SearchPost, getNextPage, getPrevPage}}>
        {/* //passing the children */}
        {children} 
    </AppContext.Provider>
);
};

//custom hook create : which means ur teruning a hook inside the component or function, then function name should be "use"(useGlobal), hence whatever u crt that strts with "use", its named as custom hook.
const useGlobalContext = () => {
    return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext};
