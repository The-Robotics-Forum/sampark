const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
})
const Verification = mongoose.model('Verification', schema);
module.exports= Verification;