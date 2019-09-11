import React from 'react';
import {Modal , Button} from 'react-bootstrap';
const topPositionedModal=(props)=>{

    return(
        <Modal show={props.show} onHide={props.closed}>
        <Modal.Header closeButton>
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closed}>
            Close
          </Button>
          <Button variant="primary" onClick={props.saved}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default topPositionedModal;