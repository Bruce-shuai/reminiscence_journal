import * as api from '../api';
import { LIKE, UPDATE, DELETE, CREATE, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING
, END_LOADING } from '../constants/actionTypes';
// Action Creators: which are functions that return actions
// 异步请求需要使用redux-thunk 

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(id);
    dispatch({type: FETCH_POST, payload: data});
  } catch (error) {
    console.log(error.message);
  }
}

export const getPosts = (page) => async (dispatch) => {
  try {

    dispatch({ type: START_LOADING });
    const {data} = await api.fetchPosts(page);
    dispatch({type: FETCH_ALL, payload: data});
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error.message);
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: {data} } = await api.fetchPostsBySearch(searchQuery);

    dispatch({type: FETCH_BY_SEARCH, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    history.push(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data});
    dispatch({ type: END_LOADING })
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