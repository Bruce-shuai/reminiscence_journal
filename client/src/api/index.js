import axios from 'axios';

// 创建一个axios实例
const API = axios.create({ baseURL: 'http://localhost:5001' });
// 请求拦截器，在所有请求进入回调之前，会先执行拦截器的内容
API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;

  return req;
})
// 用户
export const signIn = (formData) => API.post('/user/signIn', formData);
export const signUp = (formData) => API.post('/user/signUp', formData);

// 日志相关
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatedPost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value});
