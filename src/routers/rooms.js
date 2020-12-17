const express= require("express")
const auth=require("../middlewares/auth.js")
const roomMember= require("../middlewares/roomMember.js")
const roomowner =require("../middlewares/roomOwnerAuth.js")
const Room= require("../models/room.js")
const User=require("../models/user.js")
const sendEmail=require("../utils/sendEmail.js").sendInvite
const Channel = require("../models/channel.js")

const app= express.Router()

app.post("/rooms", auth,async (req,res,next)=>{
    try{
        var room = new Room(req.body)
        room.owner=req.user._id
        room.members.push(req.user._id)
        await room.save()
        var defaultChannels=["general","chill"]
        for(i in defaultChannels){
            var channel= new Channel({title:defaultChannels[i]})
            channel.room=room._id
            await channel.save()
        }
        console.log(req.user)
        // await req.body.invites.forEach(async (val)=>{
        //     await sendEmail(val,{
        //         sender:req.user.email,
        //         roomName:room.title
        //     })
        // })
        res.status(201).send(room)
    }
    catch(e){
    	console.log(e)
        if(e.name=="MongoError")
            return next({
                status: 400,
                message:e.message
            })
        
        return next({
            status: 500,
            message:e.message
        })
    }
})

app.post("/rooms/:title/join", auth,async (req,res,next)=>{
    try{
        var room =await Room.findOne({
            title:req.params.title
        })
        if(!room)
        return next({
            status:404,
            message:"no such room found"
        })
        var user= room.members.filter((val)=>{
            return val.equals(req.user._id)
        })

        if(user.length!=0)
        return next({
            status:400,
            message:"You are already part pf the room"
        })

        if(room.private){
            var isInvited=room.invites.includes(req.user.email)
            if(!isInvited)
            return next({
                status:401,
                message:"ou are not invited to the room"
            })
            room.invites=room.invites.filter((val)=>{
                console.log(typeof(val))
                return val!=(req.user.email)
            })
        }
        room.members.push(req.user._id)
        await room.save()
        res.send(room)
    }
    catch(e){
        return next({
            message:e.message
        })
    }

})

app.post("/rooms/:title/leave", auth,async (req,res,next)=>{
    try{
    var room =await Room.findOne({
        title:req.params.title
    })
    if(!room)
    {
        return next({
            status:404,
            message:"No such room"
        })
    }
    room.members= room.members.filter((val)=>{
        return !val.equals(req.user._id)
    })
    console.log(room.owner.equals(req.user._id))
    if(room.owner.equals(req.user._id)){
        if(room.members.length==0)
        {
            await room.delete()
           return res.send("room was to be deleted")
        }
        else{
            room.owner=room.members[0]
            
        }
    }
    await room.save()
    res.send(room)
    }
    catch(e){
        return next({
            message:e.message
        })
    }

})

app.post("/rooms/:title/invite", roomowner, async (req,res,next)=>{
    try{
        var room= req.room
        var sender= req.user.email
        var roomName= room.title
        var sender=req.user.email
        room.invites= room.invites.concat(req.body)
        req.body.forEach(async (val)=>{
            await sendEmail(val,{
                sender,
                roomName
            })
        })
        await room.save()
        res.send(room)
    }
    catch(e){
        return next({
            message:e.message
        })
    }
})

app.get("/rooms/:title", auth, async (req,res, next)=>{
    try{
        var room =await Room.findOne({
            title:req.params.title
        })
        if(!room)
            return res.status(404).send(req.params.title+" so such room")
        res.send(room)
    }
    catch(e){
        return next({
            message:e.message
        })
    }
})

app.delete("/rooms/:title", roomowner, async (req,res,next)=>{
    try{
        var room =await Room.findOne({
            title:req.params.title
        })
        //console.log(room.owner.equals(req.user._id))
        if(!room.owner.equals(req.user._id))
            return res.status(401).send("You are not the owner of the Room")
        await Room.deleteMany({
            title:req.params.title
        })
        res.send("Deleted Room")
    }
    catch(e){
        return next({
            message:e.message
        })
    }
})
app.patch("/rooms/:title", roomowner, async (req, res,next)=>{
    try{
        var keys= Object.keys(req.body)
        console.log(keys)
        for(key in keys){
            console.log(keys[key])
            // if(keys[key]=="private")
            //     continue
            if(req.body[keys[key]]==null)
                delete req.body[keys[key]]
        }
        var room =await Room.findOne({
            title:req.params.title
        })
        console.log(req.body)
        var keys=Object.keys(req.body)
        keys.forEach((key)=>{
            
            room[key]=req.body[key]
        })
        await room.save()
        res.send(room)
    }
    catch(e){
        if(e.name=="MongoError")
        return next({
            status:400,
            message:e.message
        })
        console.log(e)
        return next({
            message:e.message
        })
    }
})
app.get("/rooms/:title/members",roomMember ,async (req,res,next)=>{
    try{
        var room =await Room.findOne({
            title:req.params.title
        })
        var isMember=room.members.includes(req.user._id)
        console.log(isMember)
        await room.populate('members').execPopulate()
        var members=[]
        for(i in room.members){
            members.push({
                _id:room.members[i]._id,
                username:room.members[i].username,
                status:room.members[i].status,
                avatar:room.members[i].avatar,
                lastSeen:room.members[i].lastSeen,
                moderator:room.moderators.includes(room.members[i]._id),
                score:room.members[i].score
            })
        }
        res.send(members)
    }
    catch(e){
        return next({
            message:e.message
        })
    }
})
app.get("/rooms/:title/kick/:id",roomowner, async (req,res,next)=>{
    try{
        var room =await Room.findOne({
            title:req.params.title
        })
            
        room.members= room.members.filter((val)=>{
            console.log(val, req.params.id)
            return !val.equals(req.params.id)
        })
        //console.log(room.members)
        await room.save()
        res.send(room)
    }
    catch(e){
        return next({
            message:e.message
        })
    }

})
app.get("/allRooms", auth, async (req,res,next)=>{
    try{
        var search =req.query.search
        const titleRegex = new RegExp(search, 'i')
        var rooms=await Room.find({
            members:req.user._id,
            title:titleRegex
        })
        res.send(rooms)
    }
    catch(e){
        return next({
            message:e.message
        })
    }
})


app.get("/allRoomsDb", async (req,res,next)=>{
    try{
        var search =req.query.search
        const titleRegex = new RegExp(search, 'i')
        const rooms=await Room.find({
            title:titleRegex
        })
        res.send(rooms)
    }
    catch(e){
        return next({
            message:e.message
        })
    }
})

app.delete("/deleteAll", async (req,res,next)=>{
    try{
    await Room.deleteMany({})
    res.send("All rooms deleted")
    }
    catch(e){
        return next({
            message:e.message
        })
    }
})


app.get("/allMessages/:title", roomMember, async (req,res,next)=>{
    try{
    var channels=await  Room.getAllChannels(req.params.title)
    var msg={}
    for (var i=0; i<channels.length;i++){
        var channel= channels[i]
       console.log(channel._id)
       var messages=await Channel.getAllMessages(channel._id,req.user,req)
       console.log(messages)
       msg[channel.title]={
           messages,
           description:channel.description
       }
    }
    res.send(msg)
    }
    catch(e){
        return next({
            status:404,
            message:e.message
        })
    }
})

app.post("/room/:title/moderator/:username", roomowner, async (req, res, next)=>{
    try{
        var user =await User.findOne({
            username:req.params.username
        })
        if(!user)
            return next({
                status:404,
                message:"No such user found"
            })
        req.room.moderators.push(user._id)
        await req.room.save()
        res.send(req.room)
    }
    catch(e){
        next({
            message:e.message
        })
    }
})

module.exports=app