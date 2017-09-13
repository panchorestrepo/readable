import React from 'react'
import { Icon, Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { setConfirmationStatus } from '../actions'
import '../App.css';

  const DeleteConfirmation = ({setConfirmationStatus, open, id, description, onClick}) => {
    const key = `${description}@${id}`;
    console.log('delete confirmation key open',key,open)
    const show = () => setConfirmationStatus(key,true);
    const close = () => setConfirmationStatus(key,false)
  
    return (
      <div>
        <Icon name='trash outline' style={{cursor: 'pointer'}} onClick={show}/>
        <Modal size={'mini'} open={open} onClose={close} dimmer={false}>
          <Modal.Header>
            Delete {description}
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this {description}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={close}>
              No
            </Button>
            <Button negative icon='checkmark' labelPosition='right' content='Yes' onClick={() => {onClick();close()}} />
          </Modal.Actions>
        </Modal>
      </div>
    )
}

function mapStateToProps({ confirmationStatus},ownProps ) {
  console.log("mapStateToProps DeleteConfirmation:",confirmationStatus,ownProps)
  const { id, description } = ownProps;
  const key = `${description}@${id}`;
  return { open : confirmationStatus[key] }
}

export default connect(mapStateToProps,{ setConfirmationStatus })(DeleteConfirmation);
