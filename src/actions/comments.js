import {CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from './types';
import {api, headers } from './api_info';

export function createComment(values) {
    return (dispatch) => {
      fetch(`${api}/comments`, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( values )
        })
        .then(res => res.json())
        .then(response => dispatch({
            type: CREATE_COMMENT,
            payload : response
        }))
    }
  }
  
  export function editComment(comment) {
    return dispatch => {
      fetch(`${api}/comments/${comment.id}`, {
            method: 'PUT',
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( comment )
          }).then(res => res.json())
            .then(response => dispatch({
              type: EDIT_COMMENT,
              payload : response            
            }));
    }
  }
  
  export function deleteComment(comment) {
    const{ id } = comment;
    return dispatch => {
      fetch(`${api}/comments/${id}`,{
         method: 'DELETE',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then((response) => {
        dispatch({
          type: DELETE_COMMENT,
          payload: response,
        })
      })
  
    }
  }   
  