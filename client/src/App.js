import logo from './logo.svg';
import './App.css';
import { gamestatecontext } from './helpers/context';
import { useState } from 'react';
import Menu from './components/menu';
import Quiz from './components/quiz';
import Endscreen from './components/endscreen';
import io from "socket.io-client";
import Chat from './components/chat';
import PhotoCapture from './components/cam';
const socket=io.connect("http://localhost:3001");
function App() {
  /*
  const[state,setstate]=useState("menu");
  const[name,setname]=useState("");
  const[score,setscore]=useState(0);
  return (
   <>
   <gamestatecontext.Provider value={{state,setstate,name,setname,score,setscore}}>
       {state=="menu" && <Menu/>}
       {state=="playing" && <Quiz/>}
       {state=="finished" && <Endscreen/>}
    </gamestatecontext.Provider> 
   </>
  );*/
  /*
  const [name,setname]=useState("");
  const[room,setroom]=useState("");
  const[chat,showchat]=useState(false);
  const submit=()=>{
    if(name!=="" && room!=="")
    {
      console.log(room);
      socket.emit("join_group",room);
      showchat(true);
    }
  }
  return(
    <>
    <h1>chat application</h1>
    {!chat?<div>
      <h1>enter the name</h1>
    <input type='text' name='name' onChange={(e)=>setname(e.target.value)}/>
    <br></br>
    <h1>enter the room</h1>
    <input type='text' name="room" onChange={(e)=>setroom(e.target.value)}/>
    <br></br>
    <input type='submit' value="submit" onClick={submit}/>
    </div>:<Chat name={name} room={room} socket={socket}/>}
    </>
  )*/
  return(
    <>
    <PhotoCapture/>
    </>
  )
}

export default App;
