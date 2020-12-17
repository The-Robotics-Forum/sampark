import React from 'react'

export default function RoomSignIn() {
    return (
        <div className="form">
            <p className="form-title">
                Sign in to your room
            </p>
            <p className="form-subtitle">
                Enter the Room Unique ID
            </p>
            <input 
                id="room-id"
                placeholder="abcd7654"
                name="room-id"
            />
            <br />
            <button className="form-submit">
                Let's go!
            </button>
            <p className="form-bottom-text">
                Don't have a room yet? 
                <a href="#"> Create One!</a>
            </p>
        </div>
    );
}