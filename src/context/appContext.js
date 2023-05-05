import React, { useReducer, useContext } from "react";
import axios from "axios";

import reducer from "./reducer";

import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR
} from "./action";
import { json } from "express";

const AppContext = React.createContext();
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  alertText: null,
};

const Appprovider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

 
  const registerUser = async (user) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        user
      );
      const {
        token,
        user: { name },
      } = response.data;
      console.log(token, name);
    //  localStorage.setItem('token','token')
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { token, name } });
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      dispatch({ type: REGISTER_USER_ERROR, payload: { msg } });
    }
  };

  const loginUser =async (user) =>{
    dispatch({type:LOGIN_USER_BEGIN})
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", user)
      const {token, user:{name}}= response.data
      //localStorage.setItem('token', 'token')
      dispatch({type:LOGIN_USER_SUCCESS, payload:{name, token}})
    } catch (error) {
      console.log(error)
      const {msg}= error.response.data
      dispatch({type:LOGIN_USER_ERROR, payload:msg})
    }
  }
  return (
    <AppContext.Provider value={{ ...state, registerUser , loginUser}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
export { AppContext, Appprovider };
