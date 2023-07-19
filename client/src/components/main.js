import React from "react";
import { useState,useEffect } from "react";
import axios,{Axios} from "axios";
import Login from "./login";
import { Link } from "react-router-dom";
const Main=()=>{
    const[name,setname]=useState("")
    const[mail,setmail]=useState("")
    const[dept,setdept]=useState("")
    const[reg,setreg]=useState("")
    const[studlist,setlist]=useState([])
    const[studdata,setdata]=useState([])
    useEffect(()=>{
        const getdata=async()=>{
            
        }
        getdata();
    },[])
    const addtolist=async()=>{
        try
        {
            const response=await axios.post("http://localhost:3002/api/insert",{name:name,mail:mail,dept:dept,reg:reg});
            console.log(response.data);
            setlist([...studlist,response.data])
            setname('')
            setmail('')
            setreg('')
            setlist('')
            alert(response.data);
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return(
        <>
         <h1>student enrollement site</h1>
         <br></br>
         <h1>enter the name</h1>
         <input type="text" name="name" onChange={(e)=>setname(e.target.value)}/>
         <br></br>
         <h1>enter the mail id</h1>
         <input type="text" name="mail" onChange={(e)=>setmail(e.target.value)}/>
         <br></br>
         <h1>enter the reg no</h1>
         <input type="text" name="reg" onChange={(e)=>setreg(e.target.value)}/>
         <br></br>
         <h1>enter the department</h1>
         <input type="text" name="dept" onChange={(e)=>setdept(e.target.value)}/>
         <input type="submit" value="submit" onClick={addtolist}/>
         <Link to="/login">login</Link>
        </>
    )
}

export default Main;