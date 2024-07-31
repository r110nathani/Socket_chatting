const http = require("http");
const express = require("express");
const path = require("path")
const {Server} = require("socket.io");
//const { Socket } = require("dgram");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname +'/public'))); // one change

io.on("connection", (socket) => {
    socket.on('usermessage' , msg =>{
        io.emit("message" , msg)
    })
})
 
app.get("/" , (req,res) => {
    return res.sendFile("/public/index.html"); 
})

server.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 