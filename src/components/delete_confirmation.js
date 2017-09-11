import React, { Component } from 'react'
import { Icon, Button, Modal } from 'semantic-ui-react'
import './App.css';

class DeleteConfirmation extends Component {
  state = { open: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size } = this.state
    const description = this.props.description;
    return (
      <div>
        <Icon name='trash outline' style={{cursor: 'pointer'}} onClick={this.show('mini')}/>
        <Modal size={size} open={open} onClose={this.close} dimmer={false}>
          <Modal.Header>
            Delete {description}
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this {description}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={() =>this.setState({ open: false })}>
              No
            </Button>
            <Button negative icon='checkmark' labelPosition='right' content='Yes' onClick={() => {this.props.onClick();this.setState({ open: false }) }} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default DeleteConfirmation