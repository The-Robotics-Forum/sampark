const mongoose = require("mongoose");
const Room= require("../models/room.js")
const User=require("../models/user.js")

const messageSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Room',
        required:true
    },
    content: {
        type:String,
        required: true
    },
    type:{
        type:String,
        default:"text"
    }

}, { timestamps: { createdAt: true, updatedAt: false } }); //messages cannot be updated

messageSchema.statics.saveMessage= async function(userId,toUsername,roomTitle,content,type){
    var room=await Room.findOne({
        title:roomTitle
    })
    var to= await User.findOne({
        username:toUsername
    })

    var message= new DirectMessage({
        owner:userId,
        to:to._id,
        content,
        room:room._id,
        type
    })
    return await message.save()
}

const DirectMessage = mongoose.model('DirectMessage', messageSchema);

module.exports= DirectMessage;