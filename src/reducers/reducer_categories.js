import { GET_CATEGORIES  } from '../actions';
import { createCategoriesOption } from '../util/Utils';


export default function(state = [], action) {
   switch (action.type) {
       case GET_CATEGORIES: 
        console.log('GET_CATEGORIES',action.payload)
        const options = createCategoriesOption(action.payload);
        return options;
       default:
        return state;
   } 
}