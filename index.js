require("dotenv").config();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require("path")

function rp(p) {
    return path.join(__dirname, "html/" + p);
}
app.get('/', function(req, res) {
   res.sendFile(rp("index.html"));
});

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