import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING} from "../constants/actionTypes";

export default (states = {isLoading: true, posts: []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...states, isLoading:true };
    case END_LOADING:
      return {...states, isLoading:false }
    case FETCH_ALL:
      return {
        ...states,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return {...states, posts: action.payload }
    case CREATE:
      return { ...states, posts: [...states.posts, action.payload]};
    case UPDATE:
    case LIKE :
      return { ...states, posts: states.posts.map(post => post._id === action.payload._id ? action.payload : post)}
    case DELETE:
      return { ...states, posts: states.posts.filter(post => post._id !== action.payload)}
    default:
      return states;
  }
}