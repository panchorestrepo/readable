import { GET_CATEGORIES } from './types'
import { api, headers} from './api_info';

export default function getCategories() { 
    return (dispatch) => {
      fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)
        .then((categories) => dispatch({
          type: GET_CATEGORIES,
          payload : categories        
        }));
      }
  }

