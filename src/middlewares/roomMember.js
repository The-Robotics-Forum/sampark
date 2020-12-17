const jwt= require("jsonwebtoken")
const User= require("../models/user.js")
const Room= require("../models/room.js")

const auth= async function(req,res,next){

    try{
        const token= req.header("Authorization").replace("Bearer","").trim()
        const decoded =await jwt.verify(token,"secretkey")
        console.log(decoded)
        const user=await User.findOne({_id:decoded.id, 'tokens.token':token})
        if(!user)
            throw new Error("No such user")
        var room =await Room.findOne({
            title:req.params.title,
            members:user._id
        })
        if(!room)
        return next({
            status: 404,
            message: "you are not a member of Room or No room with given name exist"
        })
        
        req.room=room
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        console.log(e)
        return next({
            status: 404,
            message: e.message
        })
    }
    
}


module.exports=auth