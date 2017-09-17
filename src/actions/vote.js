import { api, headers} from './api_info';

export default function vote(id, type, action) {
    return dispatch => {
      fetch(`${api}/${type}/${id}`,{
        method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {option : action} )
      })
      .then(res => res.json())
      .then(response => dispatch( {
        type: `vote_${type}`,
        payload : response,        
      }))
    }
} 

