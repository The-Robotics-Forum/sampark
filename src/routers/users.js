const path = require('path');
const express= require("express")
const logger= require("pino")()
const multer= require("multer")
const User = require("../models/user.js")
const Verification= require("../models/emailVerification.js")
const auth=require("../middlewares/auth.js")
const sendVerification = require("../utils/sendEmail").sendVerification


const uploadDir= path.join(__dirname,"../../uploads")
var app=express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        console.log(file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      req.name=uniqueSuffix+file.originalname
      cb(null,req.name)
    }
  })
  
var upload = multer({ storage: storage }).single('avatar')

//upload profile picture
app.post('/profilePic', auth,async function (req, res) {
    upload(req, res, async function (err) {
      if (err) {
          console.log(JSON.stringify(err))
          return res.status(500).send(err)
      }
      console.log(req.name)
      var user=req.user
      user.avatar=req.name
      await user.save()
      res.send({
          success:true,
          user:user
      })
    })
  })
app.get("/profilePic", auth, async function(req,res,next){
    var img=path.join(__dirname,"../../uploads/"+req.user.avatar)
    res.sendFile(img)
})

app.post("/signup", async (req,res, next)=>{
   
    var user= new User(req.body)
    try{
        user=await user.save()

        // await sendVerification(user.email,{
        //     id:user._id
        // })
    }
    catch(e){
        console.log(e)
        return next({
            status: 400,
            message:Object.keys(e.keyValue)+" is already taken"
        })
    }

    try{
        const token= await user.generateToken()
        res.send({user,token})
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})
app.post("/login", async (req,res,next)=>{
    
    try{
     const  user = await User.findByCredentials(req.body.email,req.body.password)
     
     const token = await user.generateToken()
     if(!user.isVerified)
        return next({
            message:"Please verify your email id first"
        })

     res.send({user,token})
    }
    catch(e){
        logger.error(e)
        return next({
            status: 404,
            message:e.message
        })
    }
     
})

app.post("/logout", auth,async (req,res, next)=>{

    try{
        var token =req.token
        var user=req.user
        user.tokens= user.tokens.filter((t)=>{
            t!=token
        })
        await user.save()
        res.send(user)
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})

app.post("/logoutAll", auth,async (req,res,next)=>{
    try{
        var user=req.user
        user.tokens= []
        await user.save()
        res.send(user)
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})


app.get("/me", auth,async (req,res)=>{
    try{
        res.send(req.user)
    }
    catch(e){
        return next({
            message:e.message
        })
    }
})

app.patch("/users", auth ,async (req,res,next)=>{

    try{
        var user =req.user
        const keys= Object.keys(req.body)
        keys.forEach((key)=>{
            if(req.body[key])
                user[key]=req.body[key]
        })
        //console.log(user)
        user=await user.save()
        res.send(user)
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})


app.get("/users", async (req,res,next)=>{
    try{
        const users= await User.find({})
        res.send(users)
    }
    catch(e){
        return next({
            status: 500,
            message:e.message
        })
    }
})


app.delete("/users", async (req,res)=>{
    await User.deleteMany({})
    res.send("all users deleted")
})

app.get("/verify/:id", async (req,res)=>{
    const id= req.params.id
    var user= await User.findOne({
        _id:id
    })
    user.isVerified=true
    await user.save()
    res.send("You are verified , please go to login page now")

})
module.exports=app;