import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import CommentsReducer from './reducer_comments';
import SortReducer from './reducer_sort';
import CategoriesReducer from './reducer_categories';
import SelectedCategoryReducer from './reducer_selected_category';
import ConfirmationStatus from './reducer_confirmation_status'

const rootReducer = combineReducers({
  sortBy : SortReducer,
  posts: PostsReducer,
  comments: CommentsReducer,
  categories: CategoriesReducer,
  selectedCategory : SelectedCategoryReducer, 
  confirmationStatus : ConfirmationStatus,
  form: formReducer,
});

export default rootReducer;