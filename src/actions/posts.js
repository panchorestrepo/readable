import { CREATE_POST, DELETE_POST, EDIT_POST, FETCH_POSTS, FETCH_COMMENTS, INIT_COMMENTS } from './types';
import {api, headers } from './api_info';

export function createPost(values) {
    return (dispatch) => {
      fetch(`${api}/posts`, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( values )
        })
        .then(res => res.json())
        .then((res) => dispatch(dispathCreatePost(res)))
        .then((res) => dispatch(dispatchInitComments(res)))
    }   
  }
  
function dispathCreatePost(response) {
  return {
    type: CREATE_POST,
    payload : response
  } 
}
function dispatchInitComments(response) {
  const pid = response.payload.id
  return {
    type: INIT_COMMENTS,
    pid
  }
  
}

export function editPost(post) {
  return (dispatch) => {
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( post )
      })
      .then(res => res.json())
      .then((response) => dispatch({
        type: EDIT_POST,
        payload : response
      }));
  }
}

export function fetchPosts() {
  console.log('fetchPosts started');
  return (dispatch, getState) => {
          fetch(`${api}/posts`, { headers })
            .then(res => res.json())
            .then(response => dispatch( dispatchFetchPosts(response)))
            .then(response => {
              console.log("getState comments",response.payload);
              getComments(dispatch,response.payload,0);
            });
  }
}

function dispatchFetchPosts(response) {
  return {
    type: FETCH_POSTS,
      payload: response
  };
}

function getComments(dispatch,posts,i) {
  const post = posts[i];
  console.log("post of i:",post);
  if (typeof post !== "undefined") {
    const parentId = post["id"];
    console.log("getComments",parentId);
    fetch(`${api}/posts/${parentId}/comments`, { headers })
      .then(res => res.json())
      .then(response => dispatch( dispatchFetchComments(parentId,response)))
      .then(() => getComments(dispatch,posts,i+1))
  }
}
function dispatchFetchComments(parentId,response) {
    return {
        type: FETCH_COMMENTS,
        payload: response,
        parentId
    }  
}

export function deletePost(id) {
  return dispatch => {
    fetch(`${api}/posts/${id}`,{
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
    })
    .then(() => {
      dispatch( {
        type: DELETE_POST,
        payload: id
      })
    })

  }
}
  