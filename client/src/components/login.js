import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Course from "./course";
import AttendancePercent from "./attenpercent";
const Login=()=>{
    const[name,setname]=useState("")
    const[mail,setmail]=useState("")
    const[info,setinfo]=useState([])
    const submit=async()=>{
        try
        {
            const response = await axios.get("http://localhost:3002/api/login", {
                params: {
                  name: name,                  mail: mail,
                },
              }); 
              setname('');
              setmail('');
              console.log("r:",response.data)
              if(response.data.length!=0)  //[{'name':'dj','mail':'jf','dept':'fjf'}]
              {
                console.log(response.data)       
                setinfo(...info,response.data);
                console.log(info)
              }
            console.log(info)
            if(response.data.length===0)
            {
                alert("invalid login")
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return(
        <>
           <h1>login page</h1>
           <button onClick={() => window.location.reload()}>Logout</button>
         <br></br>
         <h1>enter the name</h1>
         <input type="text" name="name" onChange={(e)=>setname(e.target.value)}/>
         <br></br>
         <h1>enter the mail id</h1>
         <input type="text" name="mail" onChange={(e)=>setmail(e.target.value)}/>
         <br></br>
         <input type="submit" value="submit" onClick={submit}/>
         {
            info.length>0 &&
            <Link to="/course">course enrollement</Link>
         }
         <Course mail={mail} />
          <AttendancePercent mail={mail}/>
        </>
    )
}
export default Login;