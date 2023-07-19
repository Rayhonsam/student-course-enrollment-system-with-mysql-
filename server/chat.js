const express=require("express");
const app=express();
const http=require("http");
const {Server}=require("socket.io");
const cors=require("cors");


app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
})

io.on("connection",(socket)=>{
    console.log(`user connected with ${socket.id}`);

    socket.on("join_group",(data)=>{
        socket.join(data);
        console.log(`user with ${socket.id} and room is ${data}`);
    })
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("recieve_message",data)
    })
    socket.on("disconnect",()=>{
        console.log(`user with ${socket.id} is dissconnted`);
    })
})

server.listen(3001,()=>{
    console.log("listen on 3001");
})