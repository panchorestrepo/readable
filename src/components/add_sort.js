import React from 'react';
import { Button } from 'semantic-ui-react'

const AddSort = ({addPost, toggleSort, sortField}) => {
    return (
        <div>
            <Button primary icon="plus" onClick={addPost}></Button>
            <Button basic onClick={toggleSort}>Sorted by {sortField}</Button>
        </div>
    );
}

export default AddSort;