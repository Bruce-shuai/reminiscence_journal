import * as api from '../api';

// Action Creators: which are functions that return actions
// 异步请求需要使用redux-thunk 
export const getPosts = () => async (dispatch) => {

  try {
    const {data} = await api.fetchPosts();
    dispatch({type: 'FETCH_ALL', payload: data});

  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: 'CREATE', payload: data});
  } catch (error) {
    console.log(error.message);
  }
}