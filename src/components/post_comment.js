import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createComment, editComment } from '../actions';
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
        const comment = {
            ...values,
            id : guid(),
            timestamp : `${Date.now()}`,
            parentId : this.props.parentId
        }

        const oldComment = this.props.comment;
        if (typeof oldComment === 'undefined') {
            this.props.createComment(comment);
        }
        else {
            this.props.editComment({...comment, id : oldComment.id});
        }

        this.props.history.push(`/post/${this.props.parentId}`);
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
function mapStateToProps(state, ownProps) {
    const ids = ownProps.match.params.id;
    const idsArray = ids.split(':');
    const parentId  = idsArray[0];
    const commentId = idsArray[1];
    const comment = state.comments[parentId].filter((c)=> c.id === commentId)[0];
    return {comment ,parentId};
}

export default reduxForm({
    validate,
    form: 'CommentForm'
})(connect(mapStateToProps,{ createComment, editComment })(PostComment));