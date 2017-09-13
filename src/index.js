import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/posts_view';
import PostNew from './components/post_new';
import PostView from './components/post_view';
import PostComment from './components/post_comment';

import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';
import { fetchPosts, getCategories } from './actions';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    applyMiddleware(ReduxThunk)
);
console.log('index.js before dispatch',store.getState());
store.dispatch(fetchPosts());
store.dispatch(getCategories());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/posts/:id' component={PostNew}/>
                    <Route path='/posts' component={PostNew}/>
                    <Route path='/comments/:id/' component={PostComment}/>
                    <Route path='/:category/:id' component={PostView}/>
                    <Route path='/:category' component={App}/>
                    <Route path='/' component={App}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
