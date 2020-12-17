const mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.Promise=Promise;
mongoose.connect("mongodb+srv://nikhil:nikhil@cluster0.fk5bn.mongodb.net/chat?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
var db = mongoose.connection;
module.exports = db;
