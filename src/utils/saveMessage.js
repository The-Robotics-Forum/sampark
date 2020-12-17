const Channel= require("../models/channel")
const Message= require("../models/message")
saveMessage= async function(userId,roomId,channelTitle,content,type){
    console.log(Channel)
    var channel=await Channel.findOne({
        title:channelTitle,
        room:roomId
    })
    
    var message= new Message({
        owner:userId,
        content,
        channel:channel._id,
        type
    })
    var msg=await message.save()
    return msg
}

module.exports=saveMessage