import React from 'react';

import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


const modal=(props)=>{
  //  <Aux>
  //    <Backdrop show={props.show} clicked={props.clicked}/>
  //     <div className='Modal'
  //             style={{
  //                 transform:props.show ? 'translateY(0)'  : 'translateY(-100vh)',
  //                 opacity:props.show ? '1' : '0'
  //             }}>
  //            {props.children}
             
  //            <Button style={{display:'inlineBlock'}} color="secondary" size="sm" click={props.clicked}>Close</Button>
  //          </div>
  // </Aux>
      const footer=props.savebutton ? <Modal.Footer>
                                   <Button variant="primary" onClick={props.saveclick}>Save</Button>
                                   <Button variant="secondary" onClick={props.onHide}>Close</Button>
                                 </Modal.Footer> :
                                 <Modal.Footer>
                                  <Button variant="secondary" onClick={props.onHide}>Close</Button>
                               </Modal.Footer>
                                 
      return( <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
           <Modal.Header closeButton>
             <Modal.Title id="contained-modal-title-vcenter">
                 {props.heading}
             </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {props.children}
         </Modal.Body>
        {footer}
     </Modal>
      )
}

export default modal;