import React from "react";
import "./welcome.css";
import LoginForm from '../Forms/LoginForm';





function Welcome() {
    
    return (
        <div className = "welcomepage">
         <div className = "secOne"></div>
         <div className = "secTwo"><LoginForm/></div>
         <div className = "secThree"></div>
        </div>
        
    )
}

export default Welcome
