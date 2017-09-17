import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../actions/posts';
import { toggleSortPosts } from '../actions/toggleSort';
import getCategories from '../actions/categories'
import moment from 'moment';
import sortBy from "sort-by";
import Vote from './vote';
import AddSort from './add_sort';
import { Container, Grid, Header, Segment, List, Dropdown } from 'semantic-ui-react';
import { RenderLogoEntry } from '../util/Utils'
class RootView extends Component {

  onClickToggleSort() {
    this.props.toggleSortPosts();
  }

  onClickAddPost() {
    const category = this.props.category;
    this.props.history.push(`/posts/category/${category}`);
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
          <Link to={'/'}>
            <h2>Post View</h2>
          </Link>
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
                <Container>
                    <Grid columns='equal' padded={false}>
                      <Grid.Row>
                        <Grid.Column>
                          <Link to={`/${post.category}/${post.id}`}>
                            <h3>{post.title}</h3>
                          </Link>
                        </Grid.Column>
                      </Grid.Row> 
                      <Grid.Row>
                        <Grid.Column>
                          <small>{moment(parseInt(post.timestamp,10)).calendar()}</small>
                        </Grid.Column>                    
                        <Grid.Column>
                          <small>Comments ({comments[post.id] ? comments[post.id].length : 0})</small>
                        </Grid.Column> 
                        <Grid.Column>
                          <RenderLogoEntry name={post.category}/>
                        </Grid.Column> 
                        <Grid.Column width={10} textAlign='right'>
                          <Vote id={post.id}  type={"posts"} voteScore={post.voteScore} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                </Container>                    
            </List.Item>))}
          </List>
        </Segment> 
      </Container>
   );
  }
}
function mapStateToProps({posts, comments, categories, sortCriteria }, {match : {params : {category}}}) {
 const sortField = sortCriteria.posts;
 const options = categories.concat({key : 'all' , value: 'all', text : 'all'});
 category = typeof category === 'undefined' ? 'all' : category;
 const filteredPost =  _.values(posts)
                        .filter((post) =>  category === 'all' ? true : post.category === category )
                        .sort(sortBy(sortField));
 return { posts : filteredPost , comments, sortField , options, category};
}
export default connect(mapStateToProps,{ toggleSortPosts, deletePost, getCategories })(RootView);
