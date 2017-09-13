import { FETCH_COMMENTS, VOTE_COMMENT, CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, INIT_COMMENTS} from '../actions';

export default function(state = {}, action) {
   switch (action.type) {
       case FETCH_COMMENTS:
        const comments = action.payload;
        return {...state, [action.parentId]: comments};
       case VOTE_COMMENT:
        const commentId = action.payload.id;
        const parentId = action.payload.parentId;
        const newComment = action.payload;
        const filterComents = state[parentId].filter((comment) => comment.id !== commentId ).concat(newComment);

        return {...state, [parentId] : filterComents};        
       case CREATE_COMMENT:
        const pid = action.payload.parentId;
        const comment = action.payload;
        return {...state, [pid] : state[pid].concat(comment)};
       case EDIT_COMMENT:
        const comment2 = action.payload;
        const filterComents3 = state[comment2.parentId].filter((comment) => comment.id !== comment2.id ).concat(comment2);
        return {...state, [comment2.parentId] : filterComents3};        
       case DELETE_COMMENT:
        const cpid = action.parentId;
        const filterComents2 = state[cpid].filter((comment) => comment.id !== action.payload );
        return {...state, [cpid] : filterComents2};
       case INIT_COMMENTS:
        console.log('init comments pid',action.pid)
        return {...state, [action.pid] : []} 
       default:
        return state;
   } 
}