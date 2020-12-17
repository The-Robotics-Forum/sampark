var socketMap= {}

var addUser = function(username,socket,room){
    socketMap[socket.id]={
        username,
        socket:socket,
        room,
    }
}

var removeUser = function(socket){
    delete socketMap[socket.id]
}

var getUser=function(username,room){
    var keys= Object.keys(socketMap)
    var obj=keys.filter((key)=>{
        return socketMap[key].username==username&& socketMap[key].room==room
    }).map((key)=>{
        return socketMap[key].socket
    })
    return obj
}

module.exports={
    addUser,
    removeUser,
    getUser
}
