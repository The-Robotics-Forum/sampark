const path = require('path');
const express= require("express")
const multer= require("multer")

const auth = require("../middlewares/auth.js")

const uploadDir= path.join(__dirname,"../../uploads")
const app = express.Router()

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

app.post('/upload', auth,async function (req, res) {
    upload(req, res, async function (err) {
      if (err) {
          console.log(JSON.stringify(err))
          return res.status(500).send(err)
      }
      res.send({
          success:true,
          address:req.name
      })
    })
  })

app.post("/download", auth, async function(req,res,next){
    var file=path.join(__dirname,"../../uploads/"+req.body.address)
    res.sendFile(file)
})



module.exports = app