import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signIn = (formData, history) => async (dispatch) => {
  try {
    // 用户登录
    const { data } = await api.signIn(formData);

    dispatch({type: AUTH, data})
    // 返回到首页
    history.push('/')
  } catch (error) {
    console.error(error)
  }
}

export const signUp = (formData, history) => async (dispatch) => {
  try {
    // 用户注册
    const { data } = await api.signUp(formData);

    dispatch({type: AUTH, data});
    // 返回到首页
    history.push('/')
  } catch (error) {
    console.error(error)
  }
}