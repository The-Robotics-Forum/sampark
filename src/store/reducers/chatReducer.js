// This will be the reducers related to chat operations

// Right now the REDUX store will deal with the data from one room only.

/* 
    The initial state will have 
        * currentUser: The current User logged in to this client
        * roomName  : String
        * channels  : Array of channel objects
            channel Object:
                * name
                * channelDescription
                * messages: All the messages in that channel
        * users     : Array of userConversation object
            userConversation Object:
                * name: With which person currentUser has had conversations with
                * messages: All the messages in that conversation* selectedCoversation: The type of chat and the index of that chat which is selected
*/
import {
    NEW_MESSAGE,
    CHANGE_SELECTED_CHANNEL,
    CHANGE_CONVERSATION, INIT_CHANNELS,
    CHAT_LOADING_DONE,
    INIT_USERS_CONVO,
    DIRECTS_LOADING_DONE,
    INIT_ROOM,
    CHANNEL_UPDATE,
    CHANNEL_DELETE,
    ROOM_UPDATE,
    ROOM_DELETE,
    CHANNEL_CREATE
} from "../actionTypes";

const initialState = {
    currentUser: "",
    roomName: "",
    channels: [],
    users: [],
    selectedConversation: ["channels", 0],
    isChatLoaded: false,
    isDirectMessagesLoaded: false
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE:
            if (action.typeOfConversation === "channels") {
                const index = state.channels.findIndex(channel => channel.name === action.conversationName);
                let newChannels = [...state.channels];
                let oldMessages = newChannels[index].messages;
                newChannels[index] = { ...newChannels[index], messages: [...oldMessages, action.message] }

                return {
                    ...state,
                    channels: newChannels
                }
            }
            // Else this is user conversation
            const index = state.users.findIndex(userConversation => userConversation.name === action.conversationName);
            console.log(action)
            console.log(index)
            let newUserConversations = [...state.users];
            let oldMessages = newUserConversations[index].messages;
            newUserConversations[index] = { ...newUserConversations[index], messages: [...oldMessages, action.message] }

            return {
                ...state,
                users: newUserConversations
            }


        case CHANGE_CONVERSATION:
            return {
                ...state,
                selectedConversation: [action.typeOfCoversation, action.indexOfConversation]
            }

        case INIT_CHANNELS:
            console.log(action.channels)
            return {
                ...state,
                channels: action.channels
            }

        case INIT_USERS_CONVO:
            console.log(action.userConversations)
            return {
                ...state,
                users: action.userConversations
            };

        case CHAT_LOADING_DONE:
            return {
                ...state,
                isChatLoaded: true
            }

        case DIRECTS_LOADING_DONE:
            return {
                ...state,
                isDirectMessagesLoaded: true
            }

        case INIT_ROOM:
            console.log(action)
            return {
                ...state,
                roomName: action.roomName,
                channels: [],
                users: [],
                isChatLoaded: false,
                isDirectMessagesLoaded: false
            }

        case CHANNEL_UPDATE:
            let channelList = state.channels;
            const channelIndex = channelList.findIndex((channel) => channel.name === action.oldName)
            let channelObject = channelList[channelIndex];

            if (action.newName.length > 0)
                channelObject.name = action.newName
            if (action.newDescription.length > 0)
                channelObject.description = action.newDescription

            channelList[channelIndex] = channelObject;
            return {
                ...state,
                channels: channelList
            }

        case CHANNEL_DELETE:
            let chanList = state.channels
            let listchannel = () => {
                return chanList.filter((chann) => {
                    return action.name != chann.name
                })
            }
            return {
                ...state,
                channels: listchannel()
            }
        case CHANNEL_CREATE:
            return {
                ...state,
                channels : [...state.channels,action.chan]
            }
            case ROOM_UPDATE:
                return {
                    ...state,
                    roomName : action.room
                }
        default:
            return state;
    }

}

export default chatReducer