import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, toggleSortPosts, deletePost, getCategories } from '../actions';
import moment from 'moment';
import sortBy from "sort-by";
import Vote from './vote';
import AddSort from './add_sort';
import { Container, Header, Segment, List, Dropdown } from 'semantic-ui-react';

class App extends Component {

  onClickToggleSort() {
    this.props.toggleSortPosts();
  }

  onClickAddPost() {
    this.props.history.push('/posts');
  }
  onDeleteClick(post) {
      const { id } = post;
      this.props.deletePost(id);
      this.props.history.push('/');
  }
  onChangeCategory(event, data) {
    console.log('onChangeCategory',data.value);
    const category = data.value;
    this.props.history.push(category === 'all' ? '/': `/${category}`);  
  }


  render() {
    const {posts, comments, sortField, options, category} = this.props;

    return (
      <Container>
        <Header >
          <h2>Posts View</h2>
          <List horizontal>
              <List.Item>
                <AddSort addPost={this.onClickAddPost.bind(this)} toggleSort={this.onClickToggleSort.bind(this)} sortField={sortField}/>
              </List.Item>
              <List.Item>
                <Dropdown selection text={`Category : ${category}`} defaultValue={category} onChange={this.onChangeCategory.bind(this)} options={options}/>
              </List.Item>
          </List>
        </Header>
        <Segment attached>
          <List divided relaxed>
            {posts.map( (post) => (
            <List.Item key={post.id}>
              <List.Content>
                <List.Header>
                  <Link to={`/${post.category}/${post.id}`}>
                    <span>{post['title']}</span>
                  </Link>
                </List.Header>
                <List.Content>
                  <small>{moment(parseInt(post['timestamp'],10)).calendar()}</small>
                  <span className="col-sm"><small>Comments ({comments[post.id] ? comments[post.id].length : 0})</small></span>
                  <span className="col-sm"  style={{color : 'black'}}>{post['category']}</span>
                  <span style={{ float: 'right'}}>
                    <Vote id={post.id}  type={"posts"} voteScore={post['voteScore']} />
                  </span>
                </List.Content>
              </List.Content>
            </List.Item>))}
          </List>
        </Segment> 
      </Container>
   );
  }
}
function mapStateToProps(state, ownProps) {
 const sortField = state.sortBy.posts;
 const posts = _.values(state.posts);
 posts.sort(sortBy(sortField));
 const options = state.categories.concat({key : 'all' , value: 'all', text : 'all'});
// const category = state.selectedCategory;
 let category = ownProps.match.params.category;
 category = typeof category === 'undefined' ? 'all' : category;
 const filteredPost = posts.filter((post) =>  category === 'all' ? true : post.category === category );
 return { posts : filteredPost , comments : state.comments, sortField , options, category};
}
export default connect(mapStateToProps,{ fetchPosts,toggleSortPosts, deletePost, getCategories })(App);
