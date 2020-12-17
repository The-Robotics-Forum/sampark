const express= require("express")
const DirectMessage=require("../models/directMessages.js")
const roomMember= require("../middlewares/roomMember.js")
const Room = require("../models/room")
const app= express.Router()

app.get("/all",async (req,res)=>{
    var all= await DirectMessage.find({})
    res.send(all)
})

app.get("/allDirectMessages/:title", roomMember, async (req,res)=>{
    var room =await Room.findOne({
        title:req.params.title
    })
    await room.populate('members').execPopulate()
    var msgs={}
    var members= room.members
    for(var i=0;i<members.length;i++){
        var member = members[i]
        var m=await DirectMessage.find({
            room:req.room._id,
            $or:[{
                owner: member._id,
                to:req.user._id
            },{
                to:member._id,
                owner:req.user._id
            }]
        })
        var edited=[]
        for(var j=0;j<m.length;j++){
            await m[j].populate('owner').populate('to').execPopulate()
            edited.push({
                _id:m[j]._id,
                content:m[j].content,
                type:m[j].type,
                owner:m[j].owner.username,
                to:m[j].to.username,
                createdAt:m[j].createdAt
            })
        }
            
        msgs[member.username]=edited
    }
    res.send(msgs)
})

module.exports=app