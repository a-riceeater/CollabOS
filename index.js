require("dotenv").config();
const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require("path")

function rp(p) {
    return path.join(__dirname, "html/" + p);
}

app.set("socketio", io);
app.use(express.json());
app.use(express.static("public"))

app.get('/', (req, res) => {
   res.sendFile(rp("index.html"));
});

app.get("/os/:roomID", (req, res) => {
   console.log(req.params.roomID);
   res.sendFile(rp("os.html"))
})

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

const port = process.env.port;
server.listen(port, () => {
    console.log("\x1b[33mServer Running!")
    console.log("\x1b[31mThis is a development server, do not use this for hosting!\n")
    console.log(`\x1b[0mRunning on:\nhttp://localhost:${port}`)
})