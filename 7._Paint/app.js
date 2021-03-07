const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket) => { 
    socket.on("client draw", (data) => {
        data.paint.server = true;
        socket.broadcast.emit("other client draw", data);
    })
    
    socket.on("client stop", (data) => {
        data.paint.server = true;
        socket.broadcast.emit("other client stop", data);
    })
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

server.listen(3000);