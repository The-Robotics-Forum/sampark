const mongoose = require("mongoose");
const Channel= require("./channel")

const messageSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required:true,
        index:true,
    },
    content: {
        type:String,
        required: true
    },
    type:{
        type:String,
        default:"text"
    },
    reports:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    isReported:{
        type:Boolean,
        default:false
    }

}, { timestamps: { createdAt: true, updatedAt: false } }); //messages cannot be updated

messageSchema.statics.saveMessage= async function(userId,channelTitle,content,type){
    console.log(Channel)
    var channel=await Channel.findOne({
        title:channelTitle
    })
    
    var message= new Message({
        owner:userId,
        content,
        channel:channel._id,
        type
    })
    await message.save()
}

const Message = mongoose.model('Message', messageSchema);

module.exports= Message;