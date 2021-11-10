import React from "react";
import "./welcome.css";
import LoginForm from '../Forms/LoginForm';
import RegForm from '../Forms/RegForm';
import { SystemUpdateTwoTone } from "@mui/icons-material";




function Welcome({Login, error, Register, clearError}) {
    
    const ids = ["wLogin","wRegister"];
    const HIDE_CONTENT = "hideContent"
    const toggle = () => {
        clearError("");
        for (var id of ids) {
            console.log(id);
            var element = document.getElementById(id);
            var classes = element.className;
            //THIS ONLY WORK FOR 2 ELEMENTS - QUICK HACK
            if (classes.indexOf(HIDE_CONTENT) != -1) {
                element.className = classes.replace(" " + HIDE_CONTENT, "");
            } else {
                element.className = classes + " " + HIDE_CONTENT;
            }
            
        }
    }
    return (
        <div className = "welcomepage">
         <div id="wLogin" className = "secTwo"><LoginForm  Login={Login} error={error} toggleRegister={toggle}/></div>
         <div id="wRegister" className = "secThree hideContent"><RegForm Register={Register} error={error} toggleLogin={toggle}/></div>
        </div>
    )
}

export default Welcome
