import React, {useState} from 'react'
import {useMutation} from 'react-query';
import {createUser} from '../../API';
function RegForm({toggleLogin}) {
    const [details, setDetails] = useState({first_name:"", last_name:"",email:"",username: "", uhd_id:"", password:""});
    const [success, setSuccess] = useState("");
    const mutation = useMutation(createUser, {
        onSuccess: (data) => {
            console.log(data);
            if (data.created) {
                console.log("Created user successfully");
                mutation.reset();
                setSuccess("User is created successfully. User id: "+ data.userId.toString());
                //navigateToLogin();
            } else {
                console.log("error creating user", data.error);
            }
        },
        onError: (error) => {

        }
    });
    const submitHandler = async (e) => {
        //error checking for missing data
        //await mutation
        //if created successfully, toggleLogin go back to login
        
        e.preventDefault();
        mutation.mutate(details);
    }
    
    const navigateToLogin = (e) => {
        if (e)
            e.preventDefault()
        mutation.reset();
        toggleLogin();
    }
    var myError = "";
    if (mutation.data && mutation.data.error) {
        console.log("hello error", mutation.data);
        myError = mutation.data.error.message;
    }
        
    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Register</h2>
                {(success != "") ? ( <div className="success">{success}</div>): ""}
                {(myError != "") ? ( <div className="error">{myError}</div>): ""}
                <div className="form-group">
                    <label htmlFor="f-name">First Name:</label>
                    <input type="text" name="fname" id="fname" onChange={r => setDetails({...details,first_name: r.target.value})} value = {details.first_name} />
                </div>
                <div className="form-group">
                    <label htmlFor="l-name">Last Name:</label>
                    <input type="text" name="lname" id="lname" onChange={r => setDetails({...details,last_name: r.target.value})} value = {details.last_name} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">UHD Id:</label>
                    <input type="text" name="uhd_id" id="uhd_id" onChange={r => setDetails({...details,uhd_id: r.target.value})} value = {details.uhd_id} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" onChange={r => setDetails({...details,email: r.target.value})} value = {details.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">UserName:</label>
                    <input type="text" name="username" id="username" onChange={r => setDetails({...details,username: r.target.value})} value = {details.username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" id="password" onChange={r => setDetails({...details,password: r.target.value})} value = {details.password} />
                </div>
                <input type="submit" value="Create Account"></input>
                <input type="submit" value="Cancel" onClick={(e) => {navigateToLogin(e);}}></input>

            </div>
        </form>
    )
}

export default RegForm

