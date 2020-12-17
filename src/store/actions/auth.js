import { apiCall, setTokenHeader } from "../../services/api";
import {
  SET_CURRENT_USER,
  GET_CURRENT_USER,
  SET_ALL_ROOMS,
  ROOM_LOADING_COMPLETE,
  INIT_PUBLIC_ROOMS,
  PUBLIC_ROOMS_LOADED,
  JOINING_ROOM,
  JOINED_ROOM,
  ROOM_LOADING_START,
  SET_ROOM_ERROR,
  CHANNEL_UPDATE,
  CHANNEL_DELETE,
  ROOM_DELETE,
  ROOM_UPDATE,
  CHANNEL_CREATE
} from "../actionTypes";
import { initRoom } from './chatActions';
import { addError, removeError } from "./error";
import { serverBaseURL } from '../../services/api'
import jwtDecode from "jwt-decode";


export function setCurrentUser(user) {
  console.log("Set current user")
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAllRoomsOfUser(allRooms) {
  return {
    type: SET_ALL_ROOMS,
    allRooms
  }
}

export function roomLoadingStarted() {
  return {
    type: ROOM_LOADING_START
  }
}

export function roomLoadingComplete() {
  console.log("ROOM LOADED")
  return {
    type: ROOM_LOADING_COMPLETE
  }
}

export function setAllPublicRooms(allPublicRooms) {
  return {
    type: INIT_PUBLIC_ROOMS,
    allPublicRooms
  }
}

export function publicRoomsLoadingComplete() {
  return {
    type: PUBLIC_ROOMS_LOADED
  }
}

export function joiningNewRoom() {
  return {
    type: JOINING_ROOM
  }
}

export function joinedRoom(roomObject) {
  return {
    type: JOINED_ROOM,
    roomObject
  }
}

export function setRoomError(errorMessage) {
  return {
    type: SET_ROOM_ERROR,
    errorMessage
  }
}

export function setChannel(oldName, newName, newDescription) {
  return {
    type: CHANNEL_UPDATE,
    oldName,
    newName,
    newDescription
  };
}
export function delChannel(name) {
  return {
    type: CHANNEL_DELETE,
    name
  };
}
export function newChannel(chan) {
  console.log("newChannel")
  return {
    type: CHANNEL_CREATE,
    chan
  };
}
export function setRoom(room) {
  return {
    type: ROOM_UPDATE,
    room
  };
}
export function delRoom(name) {
  return {
    type: ROOM_DELETE,
    name
  };
}

// ACTIONS CREATERS DONE

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

//function for logout
export function logout() {
  console.log("LOGOUT")
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function authUser(type, userData) {
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
      console.log(`${serverBaseURL}${type}`)
      return apiCall("post", `${serverBaseURL}${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          console.log(user)
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user.user));
          dispatch(removeError());
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject(); // indicate the API call failed
        });
    });
  };
}
export function updateUser(userData) {
  console.log('uu')
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("then");
        const { token, ...user } = await apiCall("patch", `${serverBaseURL}/users`, userData);
        dispatch(setCurrentUser(user));
        dispatch(removeError());
        resolve();
      }
      catch (err) {
        console.log(err);
        dispatch(addError(err.message));
        reject();
      }
    });
  };
}

export function getCurrentUser() {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetails = await apiCall("get", `${serverBaseURL}/me`, null);
        dispatch(setCurrentUser(userDetails));
        console.log(userDetails)
        dispatch(removeError());
        resolve();
      }
      catch (err) {
        dispatch(addError(err.message));
        reject();
      }
    })
  }
}

// ROOMS 

export function getAllRoomsOfUser() {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const allRooms = await apiCall("get", `${serverBaseURL}/allRooms`, null);
        console.log(allRooms)
        dispatch(setAllRoomsOfUser(allRooms))
        dispatch(roomLoadingComplete());
        resolve();
      }
      catch (err) {
        reject();
      }
    })
  }
}

export function getAllPublicRooms() {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const allPublicRooms = await apiCall("get", `${serverBaseURL}/allRoomsDb`, null);
        console.log(allPublicRooms);
        dispatch(setAllPublicRooms(allPublicRooms));
        dispatch(publicRoomsLoadingComplete());
        resolve();
      }
      catch (err) {
        reject();
      }
    })
  }
}

export function joinPublicRoom(roomName) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch(joiningNewRoom())
        const roomObject = await apiCall("post", `${serverBaseURL}/rooms/${roomName}/join`, null);
        // dispatch(initRoom(roomObject.title))
        dispatch(joinedRoom(roomObject))
        resolve();
      }
      catch (err) {
        console.log(err)
        reject();
      }
    })
  }
}

//Channel api 
export function updateChannel(channelData) {
  const title = channelData.roomname;
  const oldName = channelData.channelname;
  const newName = channelData.title;
  const newDescription = channelData.description;
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(channelData)
        const channel = await apiCall("patch", `${serverBaseURL}/room/${title}/channels/${oldName}`, channelData);
        // A new action is dispatched for updating the channel within the redux
        dispatch(setChannel(oldName, newName, newDescription))
        dispatch(removeError());
        resolve();
      }
      catch (err) {
        console.log(err);
        dispatch(addError(err.message));
        reject();
      }
    });
  };
}
export function deleteChannel(title, name) {
  console.log(name)
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const channel = await apiCall("delete", `${serverBaseURL}/room/${title}/channels/${name}`, null);
        dispatch(delChannel(name))
        dispatch(removeError());
        resolve();
      }
      catch (err) {
        console.log(err);
        dispatch(addError(err.message));
        reject();
      }
    });
  };
}
export function createChannel(channelData) {
  const title = channelData.roomname;
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const channel = await apiCall("post", `${serverBaseURL}/channels/${title}`, channelData);
        console.log(channel)
        let newChannelObj= {
          name : channel.title,
          description : channel.description,
          messages : []
        }
        dispatch(newChannel(newChannelObj))
        dispatch(removeError());
        resolve();
      }
      catch (err) {
        console.log(err);
        dispatch(addError(err.message));
        reject();
      }
    });
  };
}

//room api
export function updateRoom(title, roomData) {
  if (!roomData.title)
    roomData.title = title
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const room = await apiCall("patch", `${serverBaseURL}/rooms/${title}`, roomData);
        dispatch(removeError());
        return resolve(room);
      }
      catch (err) {
        console.log(err);
        dispatch(addError(err.message));
        reject();
      }
    });
  };
}
export function deleteRoom(title) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const channel = await apiCall("delete", `${serverBaseURL}/rooms/${title}`, null);
        dispatch(getAllPublicRooms())
        dispatch(getAllRoomsOfUser())
        dispatch(removeError());
        resolve();
      }
      catch (err) {
        console.log(err);
        dispatch(addError(err.message));
        reject();
      }
    });
  };
}

export function createRoom(roomData) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch(roomLoadingStarted())
        await apiCall("post", `${serverBaseURL}/rooms/`, roomData);
        dispatch(getAllRoomsOfUser());
        dispatch(roomLoadingComplete())
        resolve();
      }
      catch (err) {
        console.log(err)
        dispatch(roomLoadingComplete())
        dispatch(setRoomError(err.message))
        reject();
      }
    })
  }
}
export function makeModerator(title, username, callback) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const moderator = await apiCall("post", `${serverBaseURL}/room/${title}/moderator/${username}`, null);
        dispatch(removeError());
        callback();
        resolve();
      }
      catch (err) {
        console.log(err);
        dispatch(addError(err.message));
        reject();
      }
    });
  };
}

