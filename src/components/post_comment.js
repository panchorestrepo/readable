import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/comments';
import { guid } from '../util/Utils';
import { Container, Segment } from 'semantic-ui-react';

class PostComment extends Component {
    componentDidMount() {
        const initData = this.props.comment;
        this.props.initialize(initData);
    }
    renderField(field) {
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched &&  error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text" 
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }  
    onSubmit(values) {
        const {comment, parentId, createComment, editComment, history} = this.props;
        const newComment = {
            ...values,
            id : guid(),
            timestamp : `${Date.now()}`,
            parentId 
        }

        const oldComment = comment;
        if (typeof oldComment === 'undefined') {
            createComment(newComment);
        }
        else {
            editComment({...newComment, id : oldComment.id});
        }

        history.push(`/post/${parentId}`);
    }
    render() {
        const { handleSubmit, parentId, comment } = this.props;
        return (
            <Container>
                <h2>{comment ? 'Edit ' : 'Create a new ' } Comment</h2>
                <Segment>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label="Author"
                            name="author"
                            component={this.renderField}
                        />
                        <Field
                            label="Comment"
                            name="body"
                            component={this.renderField}
                        />
                        <button type="submit" className="btn btn-primary">Save</button>
                        <Link to={`/post/${parentId}`} className="btn btn-danger ">Cancel</Link>
                    </form>
                </Segment>
            </Container>
        );
    }
}
function validate(values) {
    const errors = {};

    if (!values.author) {
        errors.author = "Please enter the author of this post";
    }
    if (!values.body) {
        errors.body = "Please enter some comments";
    }
    return errors;

}
function mapStateToProps({ comments }, {match : {params : {id, parentId}}}) {

    const comment = comments[parentId].filter((c)=> c.id === id)[0];
    return {comment ,parentId};
}

export default reduxForm({
    validate,
    form: 'CommentForm'
})(connect(mapStateToProps,actions)(PostComment));