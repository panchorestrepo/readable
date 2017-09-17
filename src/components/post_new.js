import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/posts';
import { guid } from '../util/Utils';
import { Container, Segment, Dropdown } from 'semantic-ui-react'


class PostNew extends Component {
    componentDidMount() {
        const {selectedCategory, initialize, post }  = this.props;
        let initData = {};
        if (typeof post === 'undefined' && selectedCategory !== 'all') {
            initData = {category : selectedCategory};
        }
        else {
            initData = post;
        }
        initialize(initData);
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
        const { history, editPost, createPost, selectedCategory, post } = this.props;
        const newPost = {
            ...values,
            id : guid(),
            timestamp : `${Date.now()}`,
        }
        console.log(post);
        const oldPost = post;
        if (typeof oldPost === 'undefined') {
            createPost(newPost);
            history.push(selectedCategory === 'all' ? '/' : `/${selectedCategory}`);
        }
        else {
            editPost({...newPost, id : oldPost.id});
            history.push(`/${newPost.category}/${oldPost.id}`);
        }

    }
    render() {
        const { handleSubmit, options,  post, selectedCategory } = this.props;
        return (
            <Container>
                <h2>{post ? 'Edit ' : 'Create a new ' } Post</h2>
                <Segment>
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
                        <Link to={post ? `/${post.category}/${post.id}` : selectedCategory === 'all' ? '/' : `/${selectedCategory}`} className="btn btn-danger ">Cancel</Link>
                    </form>
                </Segment>
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
function mapStateToProps({posts, categories}, {match : {params : {id, category}}}) {

    const checkedCategory = typeof category === 'undefined' ? 'all' : category;
    return {post : posts[id], options : categories, selectedCategory : checkedCategory};
}
export default reduxForm({
    validate,
    form: 'PostNewForm'
})(connect(mapStateToProps,actions)(PostNew));