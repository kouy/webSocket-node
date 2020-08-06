var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection',function (socket) {
    console.log('新用户登录:', socket.name);

    //监听新用户加入
    socket.on('login',function (obj) {
        //socket.name=obj.userid;
        //检查用户在线列表
        console.log('服务器login：', obj)
        //广播消息
        io.emit('login', obj);
        console.log(obj.username+"加入了聊天室");
    })

    //监听用户退出
    socket.on('disconnect',function () {
        //退出用户信息
        //var obj={userid:socket.name, username:onlineUser[socket.name]};
        //广播消息
        //io.emit('logout',{user:obj});
        console.log("有人退出了聊天室");
    })

    //监听用户发布聊天内容
    socket.on('message', function(obj){
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log('aaa输入：'+obj.aaa);
    });
})

http.listen(4000, function(){
  console.log('listening on *:4000');
});