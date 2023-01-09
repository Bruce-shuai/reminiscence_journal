import { AUTH, LOGOUT } from "../constants/actionTypes";

export default (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      
      return {...state, authData: action?.data}
    case LOGOUT: 
      // 清理掉浏览器中，该域名下的localStorage的信息 
      localStorage.clear();

      return { ...state, authDate: null }
    default:
      return state;
  }
}