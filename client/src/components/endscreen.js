import React,{useContext} from "react";
import { gamestatecontext } from "../helpers/context";

const Endscreen=()=>{
    const {state,setstate,score,setscore,name}=useContext(gamestatecontext);
    const restart=()=>{
        setscore(0);
        setstate("menu");
    }
    return(
        <>
        <h1>username:{name}</h1>
        <h1>result of the quiz:{score}</h1>
        <button type="button" onClick={restart}>Restart quiz</button>
        </>
    )
}
export default Endscreen