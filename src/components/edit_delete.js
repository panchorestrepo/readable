import React from 'react';
import { List, Icon } from 'semantic-ui-react'
import DeleteConfirmation from './delete_confirmation';

const EditDelete =  ({ editEntry, deleteEntry, id, description }) => {
    console.log('edit delete',description)
    return (
        <div>
            <List horizontal>
                <List.Item>
                    <Icon name="pencil" style={{cursor: 'pointer'}} onClick={editEntry}></Icon>
                </List.Item>
                <List.Item>
                    <DeleteConfirmation id={id} description={description} onClick={deleteEntry}/> 
                </List.Item>
            </List>                
        </div>
    );    
}

export default EditDelete;