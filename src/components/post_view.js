import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../actions/posts';
import { toggleSortComments } from '../actions/toggleSort';
import { deleteComment } from '../actions/comments'
import Vote from './vote';
import sortBy from "sort-by";
import AddSort from './add_sort';
import EditDelete from './edit_delete';
import { RenderLogoEntry } from '../util/Utils'
import NotFound from '../components/not_found'
import { Container, Grid, Icon, Header, Segment, List } from 'semantic-ui-react';

class PostView extends Component {

    onAddCommentClick() {
        const { id } = this.props.post;
        console.log("onAddCommentClick",id);
        this.props.history.push(`/comments/${id}`);
    }

    onClickSortComments() {
        this.props.toggleSortComments();
    }

    onEditPost() {
        console.log('edit post ',this.props.post)
        const {post } = this.props;
        this.props.history.push(`/posts/${post.id}`);
    }

    onDeleteClick(post) {
        const { id } = post;
        this.props.deletePost(id);
        this.props.history.push('/');
    } 
    onDeleteComment(comment) {
        console.log("delete comment");
        this.props.deleteComment(comment);
        this.props.history.push(`/post/${comment.parentId}`);        
    }

    onEditComment(comment) {
        console.log("edit comment",comment);
        this.props.history.push(`/comments/${comment.parentId}/${comment.id}`);
    }

    render() {
        const { post, postsLoaded, sortField, comments } = this.props;

        if (!post) {
            return postsLoaded ? <NotFound/> : <div>Loading...</div>;
        }
        comments.sort(sortBy(sortField));
        return (
        <Container>
            <h2>
                <Link to="/"><Icon name='home'/></Link>
                Post View
            </h2>
            <div>
                <Header attached='top'>
                    <Container>
                        <Grid columns='equal'>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Icon name='user'/>{post.author}
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <small>{moment(parseInt(post.timestamp,10)).calendar()}</small>
                                </Grid.Column>                    
                                <Grid.Column width={3}>
                                    <RenderLogoEntry name={post.category}/>
                                </Grid.Column> 
                                <Grid.Column width={8} textAlign='right'>
                                    <EditDelete id={post.id} description={'Post'} deleteEntry={() => this.onDeleteClick(post)} editEntry={this.onEditPost.bind(this)}/>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <h2>{post.title}</h2>
                                </Grid.Column>
                                <Grid.Column width={4} textAlign='right'>
                                    <Vote id={post.id}  type={"posts"} voteScore={post.voteScore} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <h4>{post.body}</h4>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>                     
                </Header>
                <Segment attached>
                    <h6>Comments ({comments ? comments.length : 0})</h6>
                    <AddSort addPost={this.onAddCommentClick.bind(this)} toggleSort={this.onClickSortComments.bind(this)} sortField={sortField}/>
                    <List divided relaxed>
                    {comments.map( (comment) => (
                    <List.Item key={comment.id}>
                        <Container>
                            <Grid columns='equal'>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <Icon name='user'/>{comment.author}
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <small>{moment(parseInt(comment.timestamp,10)).calendar()}</small>
                                    </Grid.Column>                    
                                    <Grid.Column width={5}>
                                        {comment.body}
                                    </Grid.Column>
                                    <Grid.Column>
                                        <EditDelete  id={comment.id} description={'Comment'} deleteEntry={() => this.onDeleteComment(comment)} editEntry={() =>     this.onEditComment(comment)}/>
                                    </Grid.Column> 
                                    <Grid.Column width={4} textAlign='right'>
                                        <Vote id={comment.id}  type={"comments"} voteScore={comment.voteScore} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>                        
                    </List.Item>))}
                    </List>                     
                </Segment>
            </div>
        </Container>
        );
    }
}

function mapStateToProps({posts, comments, categories, sortCriteria}, {match : {params : {id}}}) {
    const checkedComments = typeof comments[id] === 'undefined' ? [] : comments[id];
    const postsLoaded = categories ? categories.length > 0 : false;
    return {post: posts[id], comments : checkedComments, sortField : sortCriteria.comments, postsLoaded};
}
export default connect(mapStateToProps,{ toggleSortComments,deletePost, deleteComment })(PostView);