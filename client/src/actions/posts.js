import * as api from '../api';
import { LIKE, UPDATE, DELETE, CREATE, FETCH_ALL } from '../constants/actionTypes';
// Action Creators: which are functions that return actions
// 异步请求需要使用redux-thunk 
export const getPosts = () => async (dispatch) => {

  try {
    const {data} = await api.fetchPosts();
    dispatch({type: FETCH_ALL, payload: data});

  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data});
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, updatePost) => async (dispatch) => {
  try {
    const { data } = await api.updatedPost(id, updatePost);

    dispatch({ type: UPDATE, payload: data})
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const {data} = await api.likePost(id);

    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error);
  }
} 