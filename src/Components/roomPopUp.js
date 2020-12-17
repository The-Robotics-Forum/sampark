import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useState } from 'react';

class CreateRoom extends React.Component {
    
        
        state = {
            show:false,
            invites:[
                'satvik.ndjnskjkj@gmail.com', 
                'nsjdknkjsnknasklaLK@SpeechGrammarList.com'
            ],
            task:'',

       
    }
    // const [show, setShow] = useState(false);
    // const [invites, addInvites] = useState(['satvik.ndjnskjkj@gmail.com', 'nsjdknkjsnknasklaLK@SpeechGrammarList.com']);
    // const [task, setTask] = useState('');
    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});
    changeHandler = (event) => {
        
        this.setState({task:event.target.value})
    }
     handleInvites = (task) => {
        if (task !== "") {
            this.setState({invites:[...this.state.invites,task], task:""})
        }    
    }
    render(){
        return (
            <div >
                <button onClick={this.handleShow}>Hii</button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group >
                                <Form.Label>Room Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" />
                            </Form.Group>
    
                            <Form.Group >
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Description" />
                            </Form.Group>
    
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Privacy</Form.Label>
                                <Form.Control as="select" custom>
                                    <option>Private</option>
                                    <option>Public</option>
                                </Form.Control>
                            </Form.Group>
    
                            <Form.Group>
    
                                <Form.Label>Invite</Form.Label>
                                <Row>
                                    <Col sm="10"><Form.Control type="text" placeholder="Enter Email" onChange={this.changeHandler} value={this.state.task} /></Col>
                                    <Col><Button className="float-right" onClick={() => { this.handleInvites(this.state.task) }}>Add</Button></Col>
                                </Row>
                                <Form.Group style={{marginTop:20,}}>
                                <ListGroup >{this.state.invites.length === 0 ? null : this.state.invites.map((invite) =>
                                    <ListGroupItem  style={{flexDirection:'row'}}>{invite}
                                    
                                        <span className="glyphicon glyphicon-trash"></span>
                                    
                                    </ListGroupItem>
                                )}
                                </ListGroup>
                                </Form.Group>
                                <Col>
    
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            
            </div>
        );
    }
    
}


export default CreateRoom;