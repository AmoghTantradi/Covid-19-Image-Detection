import React from 'react'
import {Modal,Button} from 'react-bootstrap'


function Popup(props){

  const [show, setShow] = React.useState(true)

  const handleClose = ()=> setShow(false)

  //const handleShow = ()=> setShow(true)

 
    return ( 
     

    <Modal
      show={show}
      
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Disclaimer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Please Remember</h4>
        <p>
        Although this detector is extremely accurate with around 97 percent accuracy, it should not be used as a primary form of diagnosis. </p>
        
        <p>There are no guarentees that the detector will correctly identify whether or not you have Covid-19.</p>

        <p>By using this application, you alleviate me, Amogh Tantradi, of all legal liabilities.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Proceed</Button>
      </Modal.Footer>
    </Modal>
  );


}


export default Popup