import React from 'react';

import Icon from '../../Assests/Images/icon-logo-2.png'


export default function Header(props) {
    return (
        <div className="header" >
            <div className="header-icon-box">
                <img src={Icon} className="icon" alt="header-logo" />
            </div>
            <div className="chat-window-header">
                <div className="room-option-button">
                    <p className="heading">{props.roomName}</p>
                </div>
                <div className="spacer"></div>
                <div className="user-section">
                    {props.currentUser}
                </div>
            </div>
        </div>
    )
}