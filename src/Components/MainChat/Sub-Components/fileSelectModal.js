import React from "react";
import { Modal, Button } from 'react-bootstrap';
import './fileSelectModal.css';

class FileSelectModal extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
    }

    state = {
        show: false,
        selectedFile: null,
        fileName: ""

    }
    onChange = () => {
        this.setState({
            fileName: this.inputRef.current.files[0].name
        })
    }
    fileUpload = () => {
        let file;
        try{
            file = this.inputRef.current.files[0];
            this.props.sendFile(file);
            this.props.toggleFilePopUp();
        } catch {
            this.props.toggleFilePopUp();
        }
    }

    changeHandler = (event) => {
        this.setState({ task: event.target.value })
    }

    render() {
        return (
                <Modal show={this.props.filePopUpOpen} onHide={this.props.toggleFilePopUp}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        <div className="file-upload">
                            <div className="file-select">
                                <div className="file-select-button" >Choose File</div>
                                <input type="file" name="file" ref={this.inputRef} onChange={this.onChange} ></input>
                                <div className="file-select-name" id="noFile">{this.state.fileName  === "" ? "No file chosen" : this.state.fileName}</div> 
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-primary" onClick={this.fileUpload} >
                            Send
                        </Button>
                    </Modal.Footer>
                </Modal>
            
        );
    }

}


export default FileSelectModal;