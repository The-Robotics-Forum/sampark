const mongoose= require("mongoose")
const validator=require("validator")
const Channel= require("./channel.js")
const schema= mongoose.Schema({
    title:{
        type:"String",
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    description:{
        type:"String",
        default:"Itni shanti kyu hai???"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    private:{
        type:"Boolean",
        default:false
    },
    invites:[
        {
            type:"String",
            validate:function(value){
                if(!validator.isEmail(value))
                    throw new Error("Invalid email provided")
            }
        }
    ],
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    moderators:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    online:[
        {
            socketId:{
                type:"String"
            },
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ]
})

schema.methods.isOwner= function(user){
    return this.owner.equals(user._id)
}

schema.statics.getAllChannels= async function(title){

    var room = await Room.findOne({
        title
    })

    if(!room)
        throw new Error("So such room found")
    
    const channels = await Channel.find({
        room:room._id
    })
    return channels

}
schema.statics.getAllOnlineUsers=async function(title){
    var room = await Room.findOne({
        title
    })

    if(!room)
        throw new Error("So such room found")
    var users=await room.populate('online.user').execPopulate()
    //console.log(users)
    return users.online
}

const Room = new mongoose.model('Room',schema)

module.exports=Room