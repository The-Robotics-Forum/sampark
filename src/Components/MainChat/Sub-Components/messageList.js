import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Prism from 'prismjs';
import Dropdown from 'react-bootstrap/Dropdown'
import { ButtonGroup } from 'react-bootstrap';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import { connect } from 'react-redux'
import { downloadFile } from '../../../store/actions/chatActions';
var fileDownload = require('js-file-download');

function TextMessage(props) {

    const [hover, setHover] = React.useState(false);

    function toggleHover() {
        console.log("HOVERED")
        setHover(!hover)
    }

    const getCoords = (url) => {
        console.log(url);
        const coords = url.split("=")[1].split(",");
        console.log([coords[1], coords[0]]);
        return coords[1].toString() + ", " + coords[0].toString();
    };

    if (props.messageObject.type === "location") {
        getCoords(props.messageObject.content);
    }

    const DropdownElement = () => (
        <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" size="sm" />

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => { console.log("Report!") }}>Report</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )

    const fileDownloaded = (file, fileName) => {
        console.log("HEY");
        console.log(file);
        fileDownload(file, fileName);
    }

    return (
        <div className="message" key={props.keyValue} >
            {props.messageObject.owner === props.currentUser ? (
                <div className="spacer"></div>
            ) : null}
            <div
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}

                className={
                    "message-area" +
                    (props.messageObject.owner === props.currentUser
                        ? " current-user"
                        : " other-user") + (props.messageObject.type.includes('code') ? " code-area" : "") + (props.messageObject.type.includes('file') ? " file-area" : "")
                }
            >
                <div className="message-user" >
                    <div className="user-name">{props.messageObject.owner}</div>
                    <div className="spacer"></div>
                    {hover ? <div className="options" ><DropdownElement /></div> : null}
                </div>

                {props.messageObject.type === "text" ? (
                    <div className="message-content">{props.messageObject.content}</div>
                ) : props.messageObject.type === "location" ? (
                    <div className="location-content">
                        <a href={props.messageObject.content}>
                            {props.messageObject.content}
                        </a>
                        <img
                            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${getCoords(
                                props.messageObject.content
                            )},11,0/400x200@2x?access_token=pk.eyJ1Ijoic2F0dmlrZGFuZGFsZSIsImEiOiJja2JpMmJkdGQwYjZhMnRwamlmYmhmZDQ5In0.xEAG7PvsDEt0lM4PCUQ_NA&logo=false`}
                            alt="location-image"
                            className="static-map"
                        ></img>
                    </div>
                ) : props.messageObject.type.includes('code') ?
                            (
                                <div className="message-content "><pre><code className={"language-" + props.messageObject.type.split("/")[1].toLowerCase()}>{`${props.messageObject.content}`}</code></pre></div>
                            ) : (   // It is file
                                <div
                                    className="message-content"
                                    onClick={() => {
                                        props.downloadFile(props.messageObject.content, (file) => {
                                            fileDownloaded(file, props.messageObject.type.split("/")[1])
                                        })
                                    }}
                                ><GetAppRoundedIcon />{props.messageObject.type.split("/")[1]}</div>
                            )

                }
                <div className="message-time">{props.messageObject.time}</div>
            </div>
        </div>
    );
}

class MessageList extends React.Component {
    componentDidMount() {
        Prism.highlightAll();
        const height = this.refs.messageScrollbar.getScrollHeight();
        this.refs.messageScrollbar.scrollTop(height);
    }

    componentDidUpdate() {
        Prism.highlightAll();
        const height = this.refs.messageScrollbar.getScrollHeight();
        this.refs.messageScrollbar.scrollTop(height);
    }

    render() {
        console.log(this.props);
        return (
            <Scrollbars autoHide ref="messageScrollbar">
                {this.props.messageList.map((message, index) => {
                    let date = new Date(message.createdAt);
                    const time = date.toTimeString().split(" ")[0];
                    let messageObject = {
                        content: message.content,
                        owner: "unknown",
                        type: message.type,
                        time: time,
                    };
                    if (message.owner) {
                        if (message.owner.username)
                            messageObject.owner = message.owner.username;
                        else messageObject.owner = message.owner;
                    }
                    Prism.highlightAll();
                    return (
                        <TextMessage
                            keyValue={index}
                            messageObject={messageObject}
                            currentUser={this.props.currentUser}
                            downloadFile={this.props.downloadFile}
                        />
                    );
                })}
            </Scrollbars>
        );
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        downloadFile: (fileAddress, callback) => { dispatch(downloadFile(fileAddress, callback)) }
    }
}

export default connect(null, MapDispatchToProps)(MessageList);
