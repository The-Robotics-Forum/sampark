const express = require("express")
const auth = require("../middlewares/roomOwnerAuth")
const roomOwner= require("../middlewares/roomOwnerAuth.js")
const roomMember= require("../middlewares/roomMember.js")
const Room = require("../models/room.js")
const User = require("../models/user.js")
const Channel = require("../models/channel")
const app = express.Router({ mergeParams: true });


//create channel sending room title to create 
app.post("/channels/:title", roomOwner, async (req, res, next) => {
    try {
        var ifexists=await Channel.findOne({
            title:req.body.title,
            room:req.room._id
        })
        console.log(!ifexists)
        if(ifexists)
        {
            return next({
                status:400,
                message:"Already a channel with "+req.body.title+" exists in this room"
            })
        }
        
        var channel = new Channel(req.body)
        channel.room = req.room.id
        await channel.save()
        console.log(channel)
        res.status(201).send(channel)
    }
    catch (e) {
        console.log(e)
        return next({
            message: e.message
        })
    }
})

//get single channel by title
app.get("/room/:title/channels/:channel",roomMember ,async (req, res, next) => {
    try {
        console.log()
        var channel = await Channel.findOne({
            title: req.params.channel,
            room:req.room._id
        })
        if (!channel)
            return next({
                status: 404,
                message: "No room with given title exist"
            })
        res.send(channel)
    } catch (e) {
        return next({
            message: e.message
        })
    }
})

//delete channel room title and channel name in path to del
app.delete("/room/:title/channels/:name", roomOwner, async (req, res, next) => {
    try {
        var channel = await Channel.findOne({
            title: req.params.name
        })
        if (!channel)
            return next({
                status: 404,
                message: "No channel with given name exist"
            })
        await Channel.deleteOne({
            title: req.params.name
        })
        res.send("Deleted Channel")
    } catch (e) {
        return next({
            message: e.message
        })
    }
})

//get all channels 
app.get("/allChannels", async (req, res, next) => {
    try {
        var search = req.query.search
        const titleRegex = new RegExp(search, 'i')
        const channels = await Channel.find({
            title: titleRegex
        })
        res.send(channels)
    } catch (e) {
        return next({
            message: e.message
        })
    }
})

//update channel
app.patch("/room/:title/channels/:name", roomOwner, async (req, res, next) => {
    try {
        var keys= Object.keys(req.body)
        for(key in keys){
            console.log(keys[key])
            if(!req.body[keys[key]])
                delete req.body[keys[key]]
        }
        console.log(req.body)
        var channel = await Channel.findOne({
            title: req.params.name,
            room:req.room._id
        })
        if (!channel)
            return res.status(404).send("No such channel available")
        Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const val = item[1];
            channel[key] = val;
        });
        await channel.save()
        res.send(channel)
    } catch (e) {
        return next({
            message: e.message
        })
    }
})

//get all channels in room
app.get("/room/:title/allChannels", async (req, res, next) => {
    var roomid = req.params.title
    try {
        const room = await Room.findOne({
            title:req.params.title
        })
        const channels = await Channel.find({
            room: room._id
        })
        res.send(channels)
    } catch (e) {
        return next({
            message: e.message
        })
    }
})


module.exports = app

