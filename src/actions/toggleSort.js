import { TOGGLE_SORT_POSTS, TOGGLE_SORT_COMMENTS } from './types'

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