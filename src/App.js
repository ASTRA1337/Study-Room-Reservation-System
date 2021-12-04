import React, {useState, Fragment} from 'react';
import { Route } from 'react-router';
import LoginForm from './components/Forms/LoginForm';
import RegForm from './components/Forms/RegForm';
import Dashboard from './components/Dashboard/Dashboard';
import {authenticate, createUser} from './API';
import Welcome from './components/Welcome/Welcome';
import Topbar from './components/Topbar/Topbar';
import Calendar from './components/Calendar/Calendar';
import {useQuery, useMutation} from 'react-query';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';

function App() {

  const adminUser = {
    name: "Admin",
    email: "admin@uhd.edu",
    password: "admin1234"

  }

  const [user, setUser] = useState({name:"",email:"", uid: ""});
  const mutation = useMutation(authenticate, {
    onSuccess: (data, variables, context) => {
      if (data.authenticated) {
        console.log("userdata", data.userData);
      } else {
        console.log("error authen", data.error.message);
      }
    },
    onError: async (error) => {
      console.log("mutation error happened", error);
    }
  });


  const Login = async (details) => {
    console.log(details);
    mutation.mutate(details);
  }

  const Logout = () => {
    mutation.reset();
    setUser({name:"",email:""});
  }

  //Login session

  if (mutation.data && mutation.data.userData) { //Login user
    const user = mutation.data.userData;
    return (
      <Dashboard user={user} logout={() => Logout()}/>
    );
  } else { // Non-login user
    var error = "";
    if (mutation.data && mutation.data.error) {
      error = mutation.data.error.message;
    }
    return (
      <Fragment>
        <div></div>
        <Welcome Login={Login} error={error}/>
      </Fragment>
    )
  }

}

export default App;
