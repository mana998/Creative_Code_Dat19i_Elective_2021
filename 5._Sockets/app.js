const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket) => { 
    socket.on("client mouse moved", (data) => {
        // sends to all sockets - io.emit
        io.emit("server sends out the coordinates", data)
        // sends back to sender - socket.emit
        // sends back to everyone but sender - socket.broadcast.emit
        console.log(data);
    })
    socket.on("helicopter mom socket", (data) => {
        console.log(data.message);
    })
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/canvas.html");
})

server.listen(3000);