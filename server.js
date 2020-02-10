var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 8000

server.listen(port);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
  socket.on('chatroom', (data) => {
      console.log(data)
      socket.broadcast.emit('chat', data)
  })

  
});