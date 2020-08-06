var express = require('express');
//var router = express.Router();
var http = require('http').Server(app);
var io = require('socket.io')(http);


/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

io.on('connection',function (socket) {
  console.log('新用户登录');

    //监听新用户加入
    socket.on('login',function (obj) {
        socket.name=obj.userid;
        //检查用户在线列表
        if(!onlineUser.hasOwnProperty(obj.userid)){
            onlineUser[obj.userid]=obj.username;
            //在线人数+1
            onlineCount++;
        }
        //广播消息
        io.emit('login',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});
        console.log(obj.username+"加入了聊天室");
    })

    //监听用户退出
    socket.on('disconnect',function () {
        //将退出用户在在线列表删除
        if(onlineUser.hasOwnProperty(socket.name)){
            //退出用户信息
            var obj={userid:socket.name, username:onlineUser[socket.name]};
            //删除
            delete onlineUser[socket.name];
            //在线人数-1
            onlineCount--;
            //广播消息
            io.emit('logout',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});
            console.log(obj.username+"退出了聊天室");
        }
    })

    //监听用户发布聊天内容
    socket.on('message', function(obj){
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log(obj.username+'说：'+obj.content);
    });
})

http.listen(4000, function(){
  console.log('listening on *:4000');
});
