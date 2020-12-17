var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nikhilghodke12101999@gmail.com',
    pass: 'Pradip@12'
  }
});

var mailOptions = {
  from: 'nikhilghodke12101990@gmail.com',
  to: 'nikhilghodke1210@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

var sendInvite=async function(to,msg){
  var mailOptions = {
    from: 'nikhilghodke12101990@gmail.com',
    to: to,
    subject: 'Invitation to Join Chat App Room',
    text: msg.sender+" has invited to join "+msg.roomName+" room on Chat Application"
  };
  const ans=await transporter.sendMail(mailOptions);
  console.log(ans)
}
var sendVerification= async function(to,msg){
  var mailOptions = {
    from: 'nikhilghodke12101990@gmail.com',
    to: to,
    subject: 'Verification to Join Chat App',
    text: "Click on below link to verify yourself \n http://chat-app-chat-app.apps.123.252.203.195.nip.io/verify/"+msg.id
  };
  const ans=await transporter.sendMail(mailOptions);
}
module.exports={
  sendInvite,
  sendVerification
}