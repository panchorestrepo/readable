import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost,toggleSortComments,deletePost, deleteComment } from '../actions';
import Vote from './vote';
import sortBy from "sort-by";
import AddSort from './add_sort';
import EditDelete from './edit_delete';

import { Container, Icon, Header, Segment, List } from 'semantic-ui-react';

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
        this.props.history.push(`/comments/${comment.parentId}:${comment.id}`);
    }

    render() {
        const { post, sortField, comments } = this.props;

        if (!post) {
            return <div>Loading...</div>
        }
        comments.sort(sortBy(sortField));
        return (
        <Container>

            <h2>
                <Link to="/"><Icon name='home'/></Link>
            Post View</h2>
            <div>
                <Header attached='top'>
                <span style={{float : 'left'}}>{post.author}  <small>{moment(parseInt(post.timestamp,10)).calendar()}</small></span>
                <span style={{float : 'right'}}>
                    <EditDelete description={'Post'} deleteEntry={() => this.onDeleteClick(post)} editEntry={this.onEditPost.bind(this)}/>
                </span>      
                <h2>{post.title}</h2>
                <span style={{ float: 'right'}}>
                  <Vote id={post.id}  type={"posts"} voteScore={post.voteScore} />
                </span>  
                <h4>{post.body}</h4>
                </Header>
                <Segment attached>
                    <h6>Comments ({comments ? comments.length : 0})</h6>
                    <AddSort addPost={this.onAddCommentClick.bind(this)} toggleSort={this.onClickSortComments.bind(this)} sortField={sortField}/>
                    <List divided relaxed>
                    {comments.map( (comment) => (
                    <List.Item key={comment.id}>
                        <List.Content>
                            <span style={{float : 'left'}}>{comment.author}  <small>{moment(parseInt(comment.timestamp,10)).calendar()}</small></span>
                            <span className="col-sm"  style={{color : 'black'}}>{comment.body}</span>
                            <span style={{display : 'inline-block'}}>
                                <EditDelete  description={'Comment'} deleteEntry={() => this.onDeleteComment(comment)} editEntry={() => this.onEditComment(comment)}/>
                            </span>
                            <span style={{ float: 'right'}}>
                                <Vote id={comment.id}  type={"comments"} voteScore={comment.voteScore} />
                            </span>
                        </List.Content>
                        
                    </List.Item>))}
                    </List>                     
                </Segment>
            </div>
        </Container>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log("mapStateToProps post show",state);
    const id = ownProps.match.params.id;
    return {post: state.posts[id], comments : state.comments[id], sortField : state.sortBy.comments};
}
export default connect(mapStateToProps,{ fetchPost, toggleSortComments,deletePost, deleteComment })(PostView);