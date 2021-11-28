import React, {useState} from 'react'
import LoginForm from './LoginForm';
import ky from 'ky-universal';

function RegForm({Register,error, toggleLogin}) {
    const [details, setDetails] = useState({fname:"", lname:"",email:"",password:""});
    const submitHandler = r => {
        r.preventDefault();
        Register(details);
    }
    
    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Register</h2>
                {(error != "") ? ( <div className="error">{error}</div>): ""}
                <div className="form-group">
                    <label htmlFor="f-name">First Name:</label>
                    <input type="text" name="fname" id="fname" onChange={r => setDetails({...details,fname: r.target.value})} value = {details.fname} />
                </div>
                <div className="form-group">
                    <label htmlFor="l-name">Last Name:</label>
                    <input type="text" name="lname" id="lname" onChange={r => setDetails({...details,lname: r.target.value})} value = {details.lname} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" onChange={r => setDetails({...details,email: r.target.value})} value = {details.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" id="password" onChange={r => setDetails({...details,password: r.target.value})} value = {details.password} />
                </div>
                <input type="submit" value="Create Account"></input>
                <input type="submit" value="Cancel" onClick={(e) => {e.preventDefault(); toggleLogin();}}></input>

            </div>
        </form>
    )
}

export default RegForm

