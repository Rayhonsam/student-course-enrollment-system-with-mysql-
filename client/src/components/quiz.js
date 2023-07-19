import React, { useState } from "react";
import { useContext } from "react";
import { gamestatecontext } from "../helpers/context";
import { Questions } from "../helpers/questions";
const Quiz=()=>{
    const {state,setstate,score,setscore,name}=useContext(gamestatecontext);
    const[currques,setques]=useState(0);
    const[option,setoption]=useState("");
    const nextquiz=()=>{
        console.log(option);
        if(Questions[currques].asnwer===option)
        {
            console.log("io");
            setscore(score+1);
            setoption('');
            alert(score);
        }
      
        setques(currques+1);
    }
    const finishQuiz=()=>{
        if(Questions[currques].asnwer===option)
        {
            alert(score);
            console.log(score);
            setscore(score+1);
        }
        console.log(name)
        setstate("finished");
    }
    return(
        <>
        <h1>quiz</h1>
        <div className="question">
            <h1>{Questions[currques].prompt}</h1>
            <br></br>
            <button type="button" onClick={()=>setoption("optionA")}>{Questions[currques].optionA}</button>
            <br></br>
            <button type="button" onClick={()=>setoption('optionB')}>{Questions[currques].optionB}</button>
            <br></br>
            <button type="button" onClick={()=>setoption("optionC")}>{Questions[currques].optionC}</button>
            <br></br>
            <button type="button" onClick={()=>setoption("optionD")}>{Questions[currques].optionD}</button>
            <br></br>
            {
                currques!==Questions.length-1 &&
                <button type="button" onClick={nextquiz}>Next Quiz</button>
            }
            {
                currques===Questions.length-1 &&
                <button type="button" onClick={finishQuiz}>Finish quiz</button>
            }
        </div>
        </>
    )
}

export default Quiz;