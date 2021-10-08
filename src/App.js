import React, {useState} from 'react';
import { Route } from 'react-router';
import LoginForm from './components/LoginForm';
import RegForm from './components/RegForm';
import {authenticate} from './API';


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

  return (
    <div className="App">
      {(user.email != "") ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.name}</span>  
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ): (
        <RegForm Register={Register} error={error} />
        //<LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
