import { useState,useEffect } from "react";
import React from "react";
import { getDocs,addDoc,collection,updateDoc,doc, deleteDoc } from "firebase/firestore";
import { db } from "../serviceAccountKey";

const Firebase=()=>{
    const [name,setname]=useState("");
    const [mail,setmail]=useState("");
    const [password,setpassword]=useState("");
    const [nmail,setnmail]=useState('');
    const [list,setlist]=useState([]);
    const usercollectionref=collection(db,"users");

    useEffect(()=>{
        const getData=async()=>{
            const data=await getDocs(usercollectionref);
            setlist(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        }
        getData();
    })
    const submit=async()=>{
            await addDoc(usercollectionref,{name:name,mail:mail,password:password});
    }
    const update=async(id)=>{
        const userdoc=doc(db,"users",id);
        await updateDoc(userdoc,{mail:nmail});
    }
    const deletes=async(id)=>{
        const userdoc=doc(db,"users",id);
        await deleteDoc(userdoc);
    }
    return(
        <>
        <h1>name</h1>
        <input type="text" name="name" onChange={(e)=>setname(e.target.value)}/>
        <br></br>
        <h1>mail</h1>
        <input type="mail" name="name" onChange={(e)=>setmail(e.target.value)}/>
        <br></br>
        <h1>password</h1>
        <input type="password" name="name" onChange={(e)=>setpassword(e.target.value)} />
        <br></br>
        <input type="submit" onClick={submit} value="submit"/>
        <table>
            <tr>
                <td>name</td>
                <td>mail</td>
                <td>password</td>
                <td>update</td>
                <td>delete</td>
            </tr>
            {
                list.map((li,index)=>(
                    <tr>
                        <td>{li.name}</td>
                        <td>{li.mail}</td>
                        <td>{li.password}</td>
                        <td>
                            <input type="text" name="name" onChange={(e)=>setnmail(e.target.value)} placeholder="enter the mail"/>
                            <button type="button" onClick={()=>update(li.id)}>update</button>
                        </td>
                        <td>
                            <button type="button" onClick={()=>deletes(li.id)}>delete</button>
                        </td>
                    </tr>
                ))
            }
        </table>
        </>
    )
}

export default Firebase;