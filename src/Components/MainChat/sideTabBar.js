import React from 'react';

import DashboardIcon from '../../Assests/Images/dashboard-24px (2).png';
import ChatIcon from '../../Assests/Images/chat-24px.png';
import PeopleIcon from '../../Assests/Images/people-24px.png';
import EditIcon from '../../Assests/Images/edit.png'

function SideBar(props) {
    return (
        <div className="sidebar-layout">
            <ul className="sidebar-list">
                <li className={"sidebar-list-item " + (props.current === "dashboard" ? "active" : "")}
                    onClick={() => {props.updatedSelected("dashboard")}} >
                    <div className="tab-item">
                        <img src={DashboardIcon} alt="dashboard" />
                        <p>Dashboard</p>
                    </div>
                </li>
                <li className={"sidebar-list-item " + (props.current === "chats" ? "active" : "")}
                    onClick={() => {props.updatedSelected("chats")}} >
                    <div className="tab-item">
                        <img src={ChatIcon} alt="dashboard" />
                        <p>Chats</p>
                    </div>
                </li>
                <li className={"sidebar-list-item " + (props.current === "people" ? "active" : "")}
                    onClick={() => {props.updatedSelected("people")}} >
                    <div className="tab-item">
                        <img src={PeopleIcon} alt="dashboard" />
                        <p>People</p>
                    </div>
                </li>
                <li className={"sidebar-list-item " + (props.current === "edit" ? "active" : "")}
                    onClick={() => {props.updatedSelected("edit")}}>
                    <div className="tab-item">
                        <img src={EditIcon} alt="dashboard" />
                        <p>Edit</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default SideBar;