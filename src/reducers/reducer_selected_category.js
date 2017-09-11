import { SELECTED_CATEGORY  } from '../actions';

export default function(state = 'all', action) {
   switch (action.type) {
       case SELECTED_CATEGORY: 
        console.log('SELECTED_CATEGORY',action.payload)
        return action.payload;
       default:
        return state;
   } 
}