import React, {useState, Fragment} from 'react';
import { Route } from 'react-router';
import LoginForm from './components/LoginForm';
import RegForm from './components/RegForm';
import {authenticate, createUser} from './API';
import Welcome from './components/Welcome/Welcome';
import Topbar from './components/Topbar/Topbar';

function App() {

  const adminUser = {
    name: "Admin",
    email: "admin@uhd.edu",
    password: "admin1234"

  }

  const [user, setUser] = useState({name:"",email:"", uid: ""});
  const [error, setError] = useState("");

  const Register = details => {
    if(details.fname != "" && details.lname != "" && details.email != "" && details.password != ""){
      setUser({
        fname: details.fname,
        lname: details.lname,
        email: details.email,
        password: details.password
      });
    }else{
      console.log("Unsucessful Registration!");
      setError("Unsucessful Registration!");
    }
  }

  const Login = async (details) => {
    //console.log(details);
    const res = await authenticate(details);
    const {authenticated, error, userData} = res;
    if(authenticated){
      console.log("Your user data:", userData);
      setUser({
        name: userData.first_name,
        email: userData.email,
        uid: userData.user_id
      });
      setError("Access granted!Navigate to dashboard");
    }else{
      console.log("Access Denied!", error);
      setError("Access Denied!" + error);
    };
  }

  const Logout = () => {
    setUser({name:"",email:""});
  }

  if (user.email != "") { //Login user
    return (
      <Fragment>
        <Topbar />
      
      <div className="App">
     
        <div className="welcome">
          <h2>
            Welcome, <span>{user.name}</span>  
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      </div>
      </Fragment>
    );
  } else { // Non-login user
    return (
      <Fragment>
        <div></div>
        <Welcome Login={Login} clearError={setError} error={error} Register={Register}/>
      </Fragment>
    )
  }
}

export default App;
