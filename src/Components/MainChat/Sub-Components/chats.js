import React from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Scrollbars } from 'react-custom-scrollbars';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay';
import { withRouter } from 'react-router-dom'

import { changeCoversation, getAllChannelMessages, addNewMessage, getAllDirectMessages, directMessagesLoadingCompleted } from '../../../store/actions/chatActions';
import { apiCall, serverBaseURL } from '../../../services/api'

import ChatBox from './chatBox';

import './chats.css';


// var roomDetails = null;


class Chats extends React.Component {
    socket = openSocket(serverBaseURL);
    room = this.props.roomName

    token = localStorage.jwtToken;

    state = {
        channelCollapse: false,
        messageCollpase: false,
        roomDetails: null,
    }

    componentDidMount() {

        if (this.props.roomName === "") {
            // No room is selected
            this.props.history.push("/rooms")
            return
        }
        if (!localStorage.jwtToken) {
            this.props.history.push('/authenticate/signin')
            return
        }

        // Retireve all channel messages from Database
        this.props.getAllChannelMessages(this.room)

        // Retrieve all direct messages
        console.log("DIRECT MESSAGES ROOM")
        console.log(this.room)
        this.props.getAllDirectMessages(this.room)

        // This will initialize the socket
        this.socket.emit('join', { username: this.props.username, room: this.room, token: this.token }, (error, data) => {
            if (error) {
                console.log(error)
                alert(JSON.stringify(error))
                // location.href="/"
            }
            else {
                console.log(data)
                this.setState({
                    roomDetails: data
                })
            }
        })

        // New message event listener
        this.socket.on('recieve', ({ username, msg, room, channel, to, time, type }) => {
            console.log({ username, msg, room, channel, time })
            if (room === this.room && username !== this.props.currentUser) {
                const messageObject = {
                    content: msg,
                    owner: { username },
                    createdAt: time,
                    type: type
                }
                console.log(messageObject)
                if (channel)    // Message is from a channel
                    this.props.addNewMessage(messageObject, "channels", channel)
                else if (to) {    // Message is from a user

                    // If to is currentUser: it should go to the conversation of the message owner
                    /**
                     * Ex: A -> B
                     * owner: A
                     * to: B
                     * If A is current user: msg should be listed in convo named B
                     * If B is current user: msg should be listed in convo named A
                     */
                    if (to === this.props.currentUser) {
                        to = messageObject.owner.username
                    }
                    this.props.addNewMessage(messageObject, "users", to)
                }
            } else {
                this.render();
            }

        })



        // List animation
        setTimeout(() => {
            this.setState({
                channelCollapse: true,
                messageCollpase: true
            })
        },
            500)
    }

    sendMessage = (newMessage, conversation, channel = true, type = "text") => {
        // Send message to socket and to the REDUX store

        let packet = {
            room: this.room,
            msg: newMessage,
            token: this.token,
            type: type
        }
        if (channel)
            packet.channel = conversation
        else
            packet.to = conversation

        console.log(packet)

        this.socket.emit('send', packet, (error) => {
            if (error) {
                console.log(error)
                return alert(error.message);
            }
            console.log("Message Sent")
        })
    }

    listElement = (listToMap, isChannel = true) => {
        // If the list is of channels, name is channels[i].name
        // If the list is of users, name is users[i] directly
        return (
            <List component="nav">
                {listToMap.map((entity, index) => {
                    return (
                        <ul
                            key={index}
                            className={"channel-list-ul " + (index === 0 ? "first" : "")}
                            onClick={() => {
                                this.props.changeConversation(isChannel ? "channels" : "users", index)
                            }}
                        >
                            <div>{entity.name}</div>
                        </ul>
                    )
                })}
            </List>
        )
    }

    render() {
        // console.log(this.props)
        // return (<h1>HELLO</h1>)
        return (
            <div className="main-area chat-area">
                <div className="chat-list">
                    <div className="chat-list-subtitle">
                        <p>Your channels</p>
                    </div>
                    <div className="channel-list">
                        <Scrollbars autoHide>
                            <div className="channel-list-header" onClick={() => this.setState({ channelCollapse: !this.state.channelCollapse })}>
                                Channels
                            {this.state.channelCollapse ? <ExpandLess /> : <ExpandMore />}
                            </div>

                            <Collapse in={this.state.channelCollapse} timeout="auto" unmountOnExit>
                                <div>
                                    {this.props.isChatLoaded ? this.listElement(this.props.channels) : null}
                                </div>
                            </Collapse>
                            <LoadingOverlay
                                active={!this.props.isDirectMessagesLoaded && this.props.isChatLoaded}
                                spinner
                                text="Loading"
                            >
                                <div className="channel-list-header" onClick={() => this.setState({ messageCollpase: !this.state.messageCollpase })}>
                                    Direct Messages
                            {this.state.messageCollpase ? <ExpandLess /> : <ExpandMore />}
                                </div>

                                <Collapse in={this.state.messageCollpase} timeout="auto" unmountOnExit>
                                    <div>
                                        {this.props.isDirectMessagesLoaded ? this.listElement(this.props.users, false) : null}
                                    </div>
                                </Collapse>
                            </LoadingOverlay>

                        </Scrollbars>
                    </div>
                </div>
                <div className="chat-box">
                    {this.props.isChatLoaded
                        ?
                        <ChatBox
                            currentConversation={
                                // ["type", conversation]
                                this.props.selectedConversation[0] === "channels"
                                    ?
                                    [this.props.selectedConversation[0], this.props.channels[this.props.selectedConversation[1]]]
                                    :
                                    [this.props.selectedConversation[0], this.props.users[this.props.selectedConversation[1]]]
                            }
                            sendMessage={this.sendMessage}
                        />
                        : null}
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user.username,
        roomName: state.chatReducer.roomName,
        channels: state.chatReducer.channels,
        users: state.chatReducer.users,
        selectedChannelIndex: state.chatReducer.selectedChannelIndex,
        selectedConversation: state.chatReducer.selectedConversation,
        isChatLoaded: state.chatReducer.isChatLoaded,
        isDirectMessagesLoaded: state.chatReducer.isDirectMessagesLoaded,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewMessage: (message, typeOfConversation, conversationName) => { dispatch(addNewMessage(message, typeOfConversation, conversationName)) },
        changeConversation: (typeOfConversation, indexOfConversation) => { dispatch(changeCoversation(typeOfConversation, indexOfConversation)) },
        getAllChannelMessages: (roomName, token) => { dispatch(getAllChannelMessages(roomName, token)) },
        getAllDirectMessages: (roomName, token) => { dispatch(getAllDirectMessages(roomName, token)) },
        directMessagesLoadingCompleted: () => { dispatch(directMessagesLoadingCompleted()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chats));