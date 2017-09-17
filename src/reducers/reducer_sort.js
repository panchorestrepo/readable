import { TOGGLE_SORT_POSTS, TOGGLE_SORT_COMMENTS  } from '../actions/types';

export const TIME_STAMP = "timestamp";
export const VOTE_SCORE = "-voteScore";

function toggleKey(key) {
    return key === TIME_STAMP ? VOTE_SCORE : TIME_STAMP;
}

const initialState = {posts : VOTE_SCORE, comments : VOTE_SCORE};

export default function(state = initialState, action) {
   switch (action.type) {
       case TOGGLE_SORT_POSTS: 
        const newPostsSortKey = toggleKey(state.posts);
        return {posts : newPostsSortKey, comments : state.comments };
       case TOGGLE_SORT_COMMENTS: 
        const newCommentsSortKey = toggleKey(state.comments);
        return {posts : state.posts, comments : newCommentsSortKey };        
       default:
        return state;
   } 
}