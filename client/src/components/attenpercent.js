import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";

class AttendancePercent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            studlist:[],
        }
    }
    getData=async()=>{
        try
        {
            const response=await axios.get("http://localhost:3002/api/attendance",{
                params:{
                    mail:this.props,
                }
            });
            console.log("response data:",response.data);
            this.setState({
                studlist:response.data,
            })
            console.log("final:",this.state.studlist);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    componentWillMount()
    {
        alert(this.props);
        const response=axios.get("http://localhost:3002/api/attendance",{
            params:{
                mail:this.props,
            }
        });
        console.log("response data:",response.data);
        this.setState({
            studlist:response.data,
        })
        console.log("final:",this.state.studlist);
    }
    render()
    {
         const{mail}=this.props;
         return(
            <>
            <h1>hello{mail}</h1>
             <h1>{this.state.studlist}</h1>
            </>
         )
    }
}

export default AttendancePercent;