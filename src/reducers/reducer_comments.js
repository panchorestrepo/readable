import { FETCH_COMMENTS, VOTE_COMMENT, CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from '../actions';

export const TIME_STAMP = "timeStamp";
export const VOTE_SCORE = "voteScore";

export default function(state = {}, action) {
   switch (action.type) {
       case FETCH_COMMENTS:
        console.log("FETCH_COMMENTS:",action.payload);
        const comments = action.payload;
        return {...state, [action.parentId]: comments};
       case VOTE_COMMENT:
        const commentId = action.payload.id;
        console.log("action vote id",commentId);
        const parentId = action.payload.parentId;
        console.log("action vote parentId",parentId);
        const newComment = action.payload;
        console.log("action vote newComment:",newComment);
        const filterComents = state[parentId].filter((comment) => comment.id !== commentId ).concat(newComment);
        console.log("filterComents",filterComents);

        return {...state, [parentId] : filterComents};        
       case CREATE_COMMENT:
        console.log("create comments action payload",action.payload);
        const pid = action.payload.parentId;
        const comment = action.payload;
        return {...state, [pid] : state[pid].concat(comment)};
       case EDIT_COMMENT:
        const comment2 = action.payload;
        console.log('EDIT COMMET',comment2)
        const filterComents3 = state[comment2.parentId].filter((comment) => comment.id !== comment2.id ).concat(comment2);
        return {...state, [comment2.parentId] : filterComents3};        
       case DELETE_COMMENT:
        const cpid = action.parentId;
        console.log("DELETE_COMMENT",cpid,action.payload);
        const filterComents2 = state[cpid].filter((comment) => comment.id !== action.payload );
        return {...state, [cpid] : filterComents2}; 
       default:
        return state;
   } 
}