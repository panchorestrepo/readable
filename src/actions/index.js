
export const GET_CATEGORIES = 'get_categories';
export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
export const DELETE_POST = 'delete_post';
export const FETCH_POST = 'fetch_post';
export const CREATE_COMMENT = 'create_comment';
export const FETCH_COMMENTS = 'fetch_comments';
export const VOTE_POST = "vote_posts";
export const VOTE_COMMENT = "vote_comments";
export const TOGGLE_SORT_POSTS = "toggle_sort_posts";
export const TOGGLE_SORT_COMMENTS = "toggle_sort_comments";
export const SELECTED_CATEGORY = 'selected_category';
export const DELETE_COMMENT = 'delete_comment';
export const EDIT_COMMENT = 'edit_comment';

const api = "http://localhost:5001"


const headers = {
  'Accept': 'application/json',
  'Authorization': "PacoRoco12345"
}

export function getCategories() { 
  return (dispatch) => {
    fetch(`${api}/categories`, { headers })
      .then(res => res.json())
      .then(data => data.categories)
      .then((categories) => dispatch(dispathGetCategories(categories)));
    }
}

export function dispathGetCategories(response) {
    return {
        type: GET_CATEGORIES,
        payload : response,
    };
}

export function selectedCategory(category) {
     return {
        type: SELECTED_CATEGORY,
        payload : category,
    }; 
}
export function createPost(values) {
  const request = fetch(`${api}/posts`, {
                    method: 'POST',
                    headers: {
                      ...headers,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( values )
                  }).then(res => res.json());
  return {
    type: CREATE_POST,
    payload : request
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
      .then((res) => dispatch(dispathEditPost(res)));

  }
}
function dispathEditPost(response) {
  return {
    type: EDIT_POST,
    payload : response
  }
}
export function createComment(values) {
  return (dispatch) => {
    fetch(`${api}/comments`, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( values )
        }).then(res => res.json())
          .then(response => dispatch(dispatchCreateComment(response)));
  }
}

export function dispatchCreateComment(response) {
    return {
      type: CREATE_COMMENT,
      payload : response
  }

}

export function editComment(comment) {
  return (dispatch) => {
    fetch(`${api}/comments/${comment.id}`, {
          method: 'PUT',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( comment )
        }).then(res => res.json())
          .then(response => dispatch(dispatchEditComment(response)));
  }
}

export function dispatchEditComment(response) {
    return {
      type: EDIT_COMMENT,
      payload : response
  }

}
export function dispatchFetchPosts(response) {
  return {
    type: FETCH_POSTS,
      payload: response
  };
}
export function fetchPosts() {
  return (dispatch, getState) => {
    // const request =
          fetch(`${api}/posts`, { headers })
           .then(res => res.json())
           .then(response => dispatch( dispatchFetchPosts(response)))
           .then(response => {
             console.log("getState posts",response.payload);
             getComments(dispatch,response.payload,0);
            });
            
  }
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
export function dispatchFetchComments(parentId,response) {
    return {
        type: FETCH_COMMENTS,
        payload: response,
        parentId
    }  
}

// export function fetchComments(parentId) {
//   return dispatch => {
//     fetch(`${api}/posts/${parentId}/comments`, { headers })
//       .then(res => res.json())
//       .then(response => dispatch( dispatchFetchComments(parentId,response)))
//   }
// }  

export function fetchPost(id) {
    const request = fetch(`${api}/posts/${id}`,{ headers});
    return {
        type: FETCH_POST,
        payload: request
    };    
}

export function deletePost(id) {
    fetch(`${api}/posts/${id}`,{
       method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
    })
    return {
        type: DELETE_POST,
        payload: id
    };
}

export function deleteComment(comment) {
    const{ parentId, id } = comment;
    console.log("deleteComment",id);
    fetch(`${api}/comments/${id}`,{
       method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
    })
    return {
        type: DELETE_COMMENT,
        payload: id,
        parentId
    };
}   
export function dispathVote(id,type,response) {
    return {
        type: `vote_${type}`,
        payload : response,
    };
}
export function vote(id, type, action) {
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
      .then(response => dispatch( dispathVote(id,type,response)))
    }
} 

export function toggleSortPosts() {
  return {
    type : TOGGLE_SORT_POSTS
  }
}

export function toggleSortComments() {
  return {
    type : TOGGLE_SORT_COMMENTS
  }
}  

