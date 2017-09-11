import React, {Component} from 'react';
import { List, Icon } from 'semantic-ui-react'
import DeleteConfirmation from './delete_confirmation';

class EditDelete extends Component {

    render() {
        const { editEntry, deleteEntry, description } = this.props;

        return (
            <div>
                <List horizontal>
                    <List.Item>
                        <Icon name="pencil" style={{cursor: 'pointer'}} onClick={editEntry}></Icon>
                    </List.Item>
                    <List.Item>
                        <DeleteConfirmation description={description} onClick={deleteEntry}/> 
                    </List.Item>
                </List>                
            </div>
        );
    }
}

export default EditDelete;