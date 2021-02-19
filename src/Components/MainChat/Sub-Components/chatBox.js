import React from 'react';
import { connect } from 'react-redux';
import Prism from 'prismjs'

import fileSelectModel from './fileSelectModal';
import CodeSnippetModel from './codeSnippetModal';
import NewMessageComponent from './newMessage';
import MessageList from './messageList';
import { addNewMessage, uploadFile } from '../../../store/actions/chatActions';
import FileSelectModal from './fileSelectModal';


class ChatBox extends React.Component {
    state = {
        message: "",
        filePopUpOpen: false,
        codePopUpOpen: false,
    }

    componentDidMount() {
        Prism.highlightAll();
    }


    toggleFilePopUp = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                filePopUpOpen: !prevState.filePopUpOpen
            }
        })
    }

    toggleCodePopUp = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                codePopUpOpen: !prevState.codePopUpOpen
            }
        })
    }


    handleNewMessageChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    sendLocation = (locationMessageString) => {
        const message = {   // For the store
            content: locationMessageString,
            owner: { username: this.props.currentUser },
            createdAt: new Date(Date.now()).toISOString(),
            type: "location"
        }
        let nameOfConversation = "";
        // Send the message through socket
        if (this.props.currentConversation[0] === "channels") {
            nameOfConversation = this.props.currentConversation[1].name
            this.props.sendMessage(locationMessageString, nameOfConversation, true, "location")
        } else {
            nameOfConversation = this.props.currentConversation[1].name
            this.props.sendMessage(locationMessageString, nameOfConversation, false, "location")
        }
        this.props.addNewMessage(message, this.props.currentConversation[0], nameOfConversation)
    }

    addNewMessage = () => {
        if (this.state.message.length === 0)
            return;
        const message = {
            content: this.state.message,
            owner: { username: this.props.currentUser },
            createdAt: new Date(Date.now()).toISOString(),
            type: "text"
        }
        let nameOfConversation = "";
        // Send the message through socket
        if (this.props.currentConversation[0] === "channels") {
            nameOfConversation = this.props.currentConversation[1].name
            this.props.sendMessage(this.state.message, nameOfConversation, true, "text")
        } else {
            nameOfConversation = this.props.currentConversation[1].name
            this.props.sendMessage(this.state.message, nameOfConversation, false, "text")
        }
        this.props.addNewMessage(message, this.props.currentConversation[0], nameOfConversation)
        this.setState({
            message: ""
        })

    }


    sendCode = (language, code) => {
        this.toggleCodePopUp();
        console.log(language)
        console.log(code)

        if (code.length === 0 || language.length === 0)
            return;
        const message = {
            content: code,
            owner: { username: this.props.currentUser },
            createdAt: new Date(Date.now()).toISOString(),
            type: `code/${language}`,
        }
        let nameOfConversation = "";
        // Send the message through socket
        if (this.props.currentConversation[0] === 'channels') {
            nameOfConversation = this.props.currentConversation[1].name
            this.props.sendMessage(code, nameOfConversation, true, `code/${language}`)
        } else {
            nameOfConversation = this.props.currentConversation[1].name
            this.props.sendMessage(code, nameOfConversation, false, `code/${language}`)
        }
        this.props.addNewMessage(message, this.props.currentConversation[0], nameOfConversation)
        this.render();
        this.setState({
            message: ""
        })
        Prism.highlightAll();
    }

    sendFile = (file) => {
        console.log("SEND FILE")
        console.log(file)
        this.props.uploadFile(file, file.name, (fileAddress) => {
            console.log(fileAddress)
            const message = {   // For the store
                content: fileAddress,
                owner: { username: this.props.currentUser },
                createdAt: new Date(Date.now()).toISOString(),
                type: "file/" + file.name
            }
            let nameOfConversation = "";
            // Send the message through socket
            if (this.props.currentConversation[0] === "channels") {
                nameOfConversation = this.props.currentConversation[1].name
                this.props.sendMessage(fileAddress, nameOfConversation, true, "file/" + file.name)
            } else {
                nameOfConversation = this.props.currentConversation[1].name
                this.props.sendMessage(fileAddress, nameOfConversation, false, "file/" + file.name)
            }
            this.props.addNewMessage(message, this.props.currentConversation[0], nameOfConversation)
        })
    }

    render() {
        // console.log(this.props)
        let title = "";
        let description = null;
        let isPersonal = "";
        let conversation = null;

        if (this.props.currentConversation[0] === "channels") {
            conversation = this.props.currentConversation[1];
            title = conversation.name;
            description = conversation.description;
            isPersonal = false;
        } else {
            conversation = this.props.currentConversation[1];
            title = conversation.name;
            isPersonal = true;
        }

        // console.log(this.props)

        return (
            <div className="chat-area-border">
                <div className="chat-header">
                    <div className="chat-name">
                        {title}
                    </div>
                    <div className="chat-description">
                        {description || "No Description"}
                    </div>
                </div>
                <div className="chat-message">
                    <MessageList currentUser={this.props.currentUser} messageList={conversation.messages} />
                </div>
                <div className="new-message">
                    <NewMessageComponent
                        currentMessage={this.state.message}
                        messageOnChange={this.handleNewMessageChange}
                        sendOnClick={this.addNewMessage}
                        sendLocation={this.sendLocation}
                        toggleCodePopUp={this.toggleCodePopUp}
                        toggleFilePopUp={this.toggleFilePopUp}
                    />
                </div>
                <FileSelectModal filePopUpOpen={this.state.filePopUpOpen} toggleFilePopUp={this.toggleFilePopUp} sendFile={this.sendFile} />
                <CodeSnippetModel codePopUpOpen={this.state.codePopUpOpen} toggleCodePopUp={this.toggleCodePopUp} sendCode={this.sendCode} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewMessage: (message, typeOfConversation, conversationName) => { dispatch(addNewMessage(message, typeOfConversation, conversationName)) },
        uploadFile: (file, fileName, callback) => { dispatch(uploadFile(file, fileName, callback)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);