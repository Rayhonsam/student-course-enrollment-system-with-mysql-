import React from "react";
import { useState,useEffect } from "react";

const Chat=({name,room,socket})=>{
    const[currmessage,setmess]=useState("");
    const[list,setlist]=useState([]);
    const sendmessage=async()=>{
        if(currmessage!=="")
        {
            const messagedata={
                name:name,
                room:room,
                message:currmessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
            }
            console.log("mess:",messagedata);
            await socket.emit("send_message",messagedata);
            setlist((list)=>[...list,messagedata]);
            setmess('');
        }
    }
    useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            console.log("i")
            setlist((list)=>[...list,data]);
        });
    },[socket])
    return(
        <>
        <div className="chat-window">
            <div className="chat-header">chat bot</div>
            <div className="chat-body">
             {
                list.map((li,index)=>(
                    <div id={index} style={{backgroundColor:"red"}}>
                        {console.log(list)}
                        <h1>{li.message}</h1>
                         <h1>{li.time}</h1>
                         <h1>{li.name}</h1>
                    </div>
                ))
             }
            </div>
            <div className="chat-footer">
                <input type="text" onChange={(e)=>setmess(e.target.value)}/>
                <br></br>
                <input type="submit" value="send" onClick={sendmessage}/>
            </div>
        </div>
        </>
    )
}

export default Chat;