import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./edit.css"
import { updateChannel, deleteChannel, createChannel, updateRoom, deleteRoom } from '../../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { removeError } from "../../../store/actions/error";

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelname: '',
      roomname: this.props.roomName,
      title: '',
      description: '',
      newchannel: '',
      private: this.props.currentRoom.private
    }
  }

  //channel update 
  handleChange = e => {
    this.setState({
      channelname: e.target.name,
      title: e.target.value,
    })
  }

  handleChannelUpdate = e => {
    e.preventDefault();
    this.props.updateChannel(this.state)
  };
  handleChannelDelete = e => {
    e.preventDefault();
    this.props.deleteChannel(this.state.roomname, e.target.name)
  }
  handleCreate = e => {
    this.props.createChannel(this.state)
  }

  handleDescription = e => {
    this.setState({
      channelname: e.target.name,
      description: e.target.value
    })
  }

  channelList = () => {
    console.log("channelList")
    if (this.props.channels[0]) {
      return this.props.channels.map((channelObject, index) => {
        return <div>
          {channelObject.name != "general" && channelObject.name != "chill" &&
            <div>
              <h4>Edit Your Channels</h4>
              <div className="input-group mb-3" id="rch">
                <input type="text" className="form-control rounded" name={channelObject.name}
                  placeholder={channelObject.name} onChange={this.handleChange}
                ></input>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text rounded">Description</span>
                  </div>
                  <textarea className="form-control rounded" name={channelObject.name} placeholder={channelObject.description} onChange={this.handleDescription}></textarea>
                </div>
                <button className="btn btn-info border rounded-pill " type="button" onClick={this.handleChannelUpdate}>Update</button>
                <button className="btn btn-info border rounded-pill " name={channelObject.name} type="button" onClick={this.handleChannelDelete}>Delete</button>
              </div>
            </div>}

        </div>
      })
    }
  }

  //room data
  handleRoomUpdate = e => {
    e.preventDefault();
    this.props.updateRoom(this.props.roomName, this.state)

  }

  handleRoomDelete = e => {
    this.props.deleteRoom(this.state.roomname)
    this.props.history.push("/rooms")
  }
  handleChecked = e => {
    if (e.target.value === "true")
      this.setState({
        private: true
      })
    else
      this.setState({
        private: false
      })
  }

  render() {
    const { title, description, owner } = this.props.currentRoom
    this.props.history.listen(() => {
      removeError();
    });
    if (this.props.userid === owner) {
      return (
        <div>
          {this.props.error.message && (
            <div className="alert alert-danger" role="alert">{this.props.error.message}</div>
          )}
          <div className="mainbody">
            <form className="formchannel" >
              {this.channelList()}
              <br />
              <h4>Create new Channel!</h4>
              <div className="input-group mb-3 " id="ch">
                <input type="text" className="form-control rounded" name="title"
                  placeholder="Channel name" onChange={this.handleChange}
                  required></input>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text rounded">Description</span>
                  </div>
                  <textarea className="form-control rounded" placeholder="Enter Description here" onChange={this.handleDescription}></textarea>
                </div>
                <button className="btn btn-info border rounded-pill " type="button" onClick={this.handleCreate}>Create</button>
              </div>
            </form>
            <hr />
            <form className="formroom">
              <h4>Edit Your Room</h4>
              <div className="input-group mb-3 " id="rh">
                <input type="text" className="form-control rounded" placeholder={title} onChange={this.handleChange} required></input>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Description</span>
                  </div>
                  <textarea className="form-control rounded" placeholder={description} onChange={this.handleDescription}></textarea>
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div class="form-check">

                      <input class="form-check-input" type="radio" name="pri" id="priv" value="true" onChange={this.handleChecked}></input>
                      <label class="form-check-label" for="priv">Private</label>
                      <span>   </span>
                      <input class="form-check-input" type="radio" name="pri" id="pub" value="false" onChange={this.handleChecked}></input>
                      <label class="form-check-label" for="pub"> Public </label>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <button className="btn btn-info border rounded-pill " type="button" onClick={this.handleRoomUpdate}>Update</button>
                <button className="btn btn-info border rounded-pill " type="button" onClick={this.handleRoomDelete}>Delete</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="textdiv">
          <br />
          <h5>Sorry you cannot view the contents , You are not the owner of this room !</h5>
        </div>
      )
    }
  }
}
const mapStateToProps = (state) => {
  console.log("mstp")
  return {
    roomName: state.chatReducer.roomName,
    channels: state.chatReducer.channels,
    error: state.errors
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateChannel: (data) => { dispatch(updateChannel(data)) },
    deleteChannel: (title, name) => { dispatch(deleteChannel(title, name)) },
    createChannel: (data) => { dispatch(createChannel(data)) },
    updateRoom: (title, data) => { dispatch(updateRoom(title, data)) },
    deleteRoom: (data) => { dispatch(deleteRoom(data)) },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));