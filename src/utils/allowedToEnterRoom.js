const jwt= require("jsonwebtoken")
const User=require("../models/user.js")
const Room=require("../models/room.js")

class ValidationError extends Error {
	constructor(message) {
	  super(message)
	  this.name = 'ValidationError'
	  this.message = message
	}
  
	toJSON() {
	  return {
		error: {
		  name: this.name,
		  message: this.message,
		  stacktrace: this.stack
		}
	  }
	}
  }
const auth=async function(token, title, socket){
	//onsole.log("token asel bagh be"+token)
	const decoded =await jwt.verify(token,"secretkey")
    const user=await User.findOne({_id:decoded.id, 'tokens.token':token})
    if(!user)
        throw new ValidationError("No such user found")
    const room= await Room.findOne({title})
    if(!room)
		throw new ValidationError("No such room")
	var allowed=room.members.includes(user._id)
	if(!allowed)
		throw new ValidationError("You are not allowed to join room")
    socket.user=user
    socket.room=room
}
module.exports=auth