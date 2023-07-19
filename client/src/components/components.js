import React from "react";
import { useState,useEffect } from "react";

class Component extends React.Component
{
    constructor()
    {
        super();
        this.state={value:"i am sam"};
    }
    componentWillMount()
    {
        alert("welcome");
    }
    componentDidMount()
    {
        setTimeout(()=>{
           this.setState({value:"i am surya"});
        },3000)
    }
    componentWillUpdate()
    {
        alert("do you want the state");
    }
    change=()=>{
        this.setState({value:"i am rayhon"});
    }
    componentDidUpdate()
    {document.getElementById("ro").innerHTML="value updated";

    }
    render()
    {
        return(
            <>
           {this.state.value}
           <button type="button" onClick={this.change}>change value</button>
            </>
        )
    }
}
export default Component;