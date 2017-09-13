import { FETCH_COMMENTS, VOTE_COMMENT, CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, INIT_COMMENTS} from '../actions';

const updateComments = (action, state, update) => {
  const comment = action.payload;
  const parentId = comment.parentId;
  const comments = state[parentId]; 
  const filteredComments = comments.filter((c) => c.id !== comment.id );
  const newComments = update ? filteredComments.concat(comment) : filteredComments;
  return {[parentId] : newComments }
}

export default function(state = {}, action) {
   switch (action.type) {
       case FETCH_COMMENTS: {
        const comments = action.payload;
        return {...state, [action.parentId]: comments};
       }
       case VOTE_COMMENT: {
        return {...state, ...updateComments(action, state, true)};  
       }
       case CREATE_COMMENT: {
        const comment = action.payload;
        const parentId = comment.parentId;
        return {...state, [parentId] : state[parentId].concat(comment)};
       }
       case EDIT_COMMENT: {
        return {...state, ...updateComments(action, state, true)};  
       }
       case DELETE_COMMENT: {
        return {...state, ...updateComments(action, state, false)};  
       }
       case INIT_COMMENTS: {
        return {...state, [action.pid] : []};
       }
       default:
        return state;
   } 
}
