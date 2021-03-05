import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

//inital state
const initialState = {
  user: null
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions
  function setUser(user) {
    dispatch({
      type: "SET_USER",
      payload: user
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        setUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
