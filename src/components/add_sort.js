import React, {Component} from 'react';
import { Button } from 'semantic-ui-react'


class AddSort extends Component {

    render() {
        const { addPost, toggleSort, sortField } = this.props;

        return (
            <div>
                <Button primary icon="plus" onClick={addPost}></Button>
                <Button basic onClick={toggleSort}>Sorted by {sortField}</Button>
            </div>
        );
    }
}

export default AddSort;