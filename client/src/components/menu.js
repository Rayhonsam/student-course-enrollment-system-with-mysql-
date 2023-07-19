import React from "react";
import { useContext } from "react";
import { gamestatecontext } from "../helpers/context";

const Menu=()=>{
    const {name,setname,state,setstate}=useContext(gamestatecontext);
    return(
        <>
        <h1>enter the name:</h1>
        <input type="text" onChange={(e)=>setname(e.target.value)}/>
        <br></br>
        <button type="button" onClick={()=>setstate("playing")}>start quiz</button>
        </>
    )
}

export default Menu;