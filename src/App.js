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

  const [user, setUser] = useState({name:"",email:""});
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
    const isAuthenticated = await authenticate(details);
    if(isAuthenticated){
      setUser({
        name: details.name,     //TODO: This should be able to retrive name of registered user and display it. Also change hardcode on line 56 in span.
        email: details.email
      });
      setError("Access granted!Navigate to dashboard");
    }else{
      console.log("Access Denied!");
      setError("Access Denied!");
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
            Welcome, <span>{adminUser.name}</span>  
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ): (
        //<RegForm Register={Register} error={error} />
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
