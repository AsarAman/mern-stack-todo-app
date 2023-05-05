import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "./action";

const reducer = (state, action) => {
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      token: action.payload.token,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return { ...state, isLoading: false, alertText: action.payload.msg };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      token: action.payload.token,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return { ...state, isLoading: false, alertText: action.payload.msg };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
