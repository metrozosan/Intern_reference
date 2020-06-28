

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = 9001;
    server = http.createServer()
//var socketio = require('socket.io');

var socketio = require('socket.io');

//http.createServer(function(request, response) {
server.on("request", function(request, response){
    var Response = {
        "200":function(file, filename){
            filename = filename + 'static/'
            var extname = path.extname(filename);
            var header = {
                "Access-Control-Allow-Origin":"*",
                "Pragma": "no-cache",
                "Cache-Control" : "no-cache"       
            }

            response.writeHead(200, header);
            response.write(file, "binary");
            response.end();
        },
        "404":function(){
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();

        },
        "500":function(err){
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();

        }
    }


    var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

    fs.exists(filename, function(exists){
        console.log(filename+" "+exists);
        if (!exists) { Response["404"](); return ; }
        if (fs.statSync(filename).isDirectory()) { filename += 'index.html'; }

        fs.readFile(filename, "binary", function(err, file){
        if (err) { Response["500"](err); return ; }
            Response["200"](file, filename);   
        }); 

    });


}).listen(parseInt(port, 10));

console.log("Server running at http://localhost:" + port );

/*
var io = socketio.listen(server);

var store = {};

io.on('connection', function(socket) {
  socket.on('enter', function(msg) {
    usrobj = {
      'room': msg.roomid.
      'name': msg.name
    };
    store[msg.id] = usrobj;
    socket.join(msg.roomid);
  });

  socket.on('chat message', function(msg) {
    io.to(store[msg.id].room).emit('chat message', msg);
  });
  socket.on('map message', function(msg) {
    io.to(store[msg.id].room).emit('map message', msg);
  });
});
*/



var io = socketio.listen(server);

io.sockets.on('connection', function (socket) {
  console.log("connected!!");
  // 入室
  //socekt.emit("connect");
  socket.on('enter', function (roomname) {
    socket.roomname = roomname;
    socket.join(roomname);
    console.log("here!" + roomname)
  });

  socket.on('message', function (message) {
    // 送信元のidをメッセージに追加（相手が分かるように）
    message.from = socket.id;

    // 送信先が指定されているか？
    var target = message.sendto;
    if (target) {
      // 送信先が指定されていた場合は、その相手のみに送信
      socket.to(target).json.emit('message', message);

      return;
    }

    // 特に指定がなければ、ブロードキャスト
    emitMessage('message', message);
  });

  socket.on('disconnect', function () {
    emitMessage('user disconnected');
  });

  // 会議室名が指定されていたら、室内だけに通知
  function emitMessage(type, message) {
    var roomname = socket.roomname;
    if (roomname) { socket.broadcast.to(roomname).emit(type, message); }
    else { socket.broadcast.emit(type, message); }
  }
});













/*
var SSL_KEY = './cert.pem';
var SSL_CERT = './cert.pem';
var http = require("http");
var server = http.createServer();
var fs = require('fs');
var port = 9001;

var url = require('url')
var path = require('path');

//var io = require('socket.io')(http);
var socketio = require('socket.io');

server.on("request", function(request, response){
  //HTMLファイルをストリームで読み込む
  var stream = fs.createReadStream(__dirname + "/index.html");
  response.writeHead(200, {"Content-Type":"text/html"});
  stream.pipe(response);
});

server.listen(port);
console.log((new Date()) + " Server is listening on port " + port);

var io = socketio.listen(server);

io.sockets.on('connection', function (socket) {
  console.log("connected!!");
  // 入室
  //socekt.emit("connect");
  socket.on('enter', function (roomname) {
    socket.roomname = roomname;
    socket.join(roomname);
  });

  socket.on('message', function (message) {
    // 送信元のidをメッセージに追加（相手が分かるように）
    message.from = socket.id;

    // 送信先が指定されているか？
    var target = message.sendto;
    if (target) {
      // 送信先が指定されていた場合は、その相手のみに送信
      socket.to(target).json.emit('message', message);

      return;
    }

    // 特に指定がなければ、ブロードキャスト
    emitMessage('message', message);
  });

  socket.on('disconnect', function () {
    emitMessage('user disconnected');
  });

  // 会議室名が指定されていたら、室内だけに通知
  function emitMessage(type, message) {
    var roomname = socket.roomname;
    if (roomname) { socket.broadcast.to(roomname).emit(type, message); }
    else { socket.broadcast.emit(type, message); }
  }
});
*/
