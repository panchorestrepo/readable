
import { CONFIRMATION_STATUS  } from '../actions';


export default function(state = {}, action) {
   switch (action.type) {
       case CONFIRMATION_STATUS:
        console.log('CONFIRMATION_STATUS',state,action.payload) 
        return {[action.key] : action.payload};
       default:
        return state;
   } 
}