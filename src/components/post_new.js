import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost, editPost } from '../actions';
import { guid } from '../util/Utils';
import { Container, Dropdown } from 'semantic-ui-react'


class PostNew extends Component {
    componentDidMount() {
        const selectedCategory = this.props.selectedCategory;
        const post = this.props.post;
        let initData = {};
        if (typeof post === 'undefined' && selectedCategory !== 'all') {
            initData = {category : selectedCategory};
        }
        else {
            initData = post;
        }
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
    renderCategory(field) {
        const { meta: {touched, error}, options } = field;
        const className = `form-group ${touched &&  error ? 'has-danger' : ''}`;
        const selectedCategory = this.props.selectedCategory;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <div>
                    <Dropdown
                        selection
                        disabled={selectedCategory !== 'all'}
                        {...field.input}
                        placeholder={field.label}
                        options={options}
                        value={field.input.value}
                        onChange={(param,data) => field.input.onChange(data.value)}
                    />
                    </div>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
       
    onSubmit(values) {
        const post = {
            ...values,
            id : guid(),
            timestamp : `${Date.now()}`,
        }
        console.log(post);
        const oldPost = this.props.post;
        if (typeof oldPost === 'undefined') {
            this.props.createPost(post);
            this.props.history.push('/');
        }
        else {
            this.props.editPost({...post, id : oldPost.id});
            this.props.history.push(`/post/${oldPost.id}`);
        }

    }
    render() {
        const { handleSubmit, options,  post } = this.props;
        return (
            <Container>
                <h2>{post ? 'Edit ' : 'Create a new ' } Post</h2>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Title for Post"
                        name="title"
                        component={this.renderField}
                    />
                    <Field
                        label="Author"
                        name="author"
                        component={this.renderField}
                    />
                    <Field
                        label="Category"
                        name="category"
                        options={options}
                        component={this.renderCategory.bind(this)}
                    />
                    <Field
                        label="Post Content"
                        name="body"
                        component={this.renderField}
                    />
                    <button type="submit" className="btn btn-primary">Save</button>
                    <Link to={post ? `/post/${post.id}` : '/'} className="btn btn-danger ">Cancel</Link>
                </form>
            </Container>
        );
    }
}
function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Please enter a title";
    }
    if (!values.author) {
        errors.author = "Please enter the author of this post";
    }
    if (!values.category) {
        errors.category = "Please enter the category of this post";
    }    
    if (!values.body) {
        errors.body = "Please enter some content";
    }
    return errors;

}
function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    
    return {post : state.posts[id], options : state.categories, selectedCategory : state.selectedCategory};
}
export default reduxForm({
    validate,
    form: 'PostNewForm'
})(connect(mapStateToProps,{ createPost, editPost })(PostNew));