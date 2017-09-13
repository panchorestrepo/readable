import _ from 'lodash';
import { FETCH_POSTS, DELETE_POST, CREATE_POST, EDIT_POST, VOTE_POST } from '../actions';

export const TIME_STAMP = "timeStamp";
export const VOTE_SCORE = "voteScore";

export default function(state = {}, action) {
   switch (action.type) {
       case DELETE_POST:
        return _.omit(state,action.payload);
       case FETCH_POSTS:
        const filterPosts = action.payload.filter((post) => !post.deleted);
        const posts = _.mapKeys(filterPosts,'id');
        return {...posts};
       case CREATE_POST:
        console.log('create post',action)
        return {...state, [action.payload.id] : action.payload};
       case EDIT_POST: {
        const postId = action.payload.id;
        return {...state, [postId] : action.payload};
       }
       case VOTE_POST: {
        const postId = action.payload.id;
        const post = state[postId];
        return {...state, [postId] : { ...post, voteScore : action.payload.voteScore}};
       }
       default:
        return state;
   } 
}
