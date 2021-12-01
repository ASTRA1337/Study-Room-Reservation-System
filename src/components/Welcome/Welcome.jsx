import React, {Fragment} from "react";
import "./welcome.css";
import LoginForm from '../Forms/LoginForm';
import RegForm from '../Forms/RegForm';
import { SystemUpdateTwoTone } from "@mui/icons-material";




function Welcome({Login, error}) {
    
    const ids = ["wLogin","wRegister"];
    const HIDE_CONTENT = "hideContent"
    const toggle = () => {
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
        <Fragment>
            <div className="parent-top">
                <img className="item1" src= "/images/UHD logo.png" />
                <div className="item2">
                <h1>Welcome to UHD Study Room Reservation Website!</h1>
                </div>
                <img className = "item3" src = "/images/UHD Gator.png"/>  
            </div>
            <div className="parent-mid">
                <img className="item1" src="/images/studyroom.jpg" />
                <div className = "item2">
                    <div id="wLogin" className = "secTwo"><LoginForm  Login={Login} error={error} toggleRegister={toggle}/></div>
                    <div id="wRegister" className = "secThree hideContent"><RegForm toggleLogin={toggle}/></div>
                </div>
                <img className="item3" src="/images/Business Study Room.jpg" />
            </div>
       
        </Fragment>
      
    )
}

export default Welcome
