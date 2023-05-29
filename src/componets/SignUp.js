import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';


export default function SignUp(props) {
    const [credential, setCredential] = useState({name:"", email: "", password: "" });

    let nevigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({name:credential.name, email: credential.email, password: credential.password })
        });
        const json = await response.json();
        if (!json.userExit) {
            
            localStorage.setItem("authToken",json.authToken);
            nevigate('/')
            props.showAlert("Account Is Created Successfully!","success")
        }
        else {
            props.showAlert("Invalid Credentials ,Please Check Credentials","danger")
        }

    }

    const onchange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div>
                <h1>Signup For Store Yout Important Notes!</h1>
                <form onSubmit={handleSubmit}>

                    <div className="form-group my-3" >
                        <label htmlFor="exampleInputEmail1">Enter Your Name</label>
                        <input type="text" className="form-control" id="name" name="name" aria-describedby="namehelp" required minLength={3}  onChange={onchange} />
                    </div> 
                    <div className="form-group my-2" >
                        <label htmlFor="exampleInputEmail1">Enter Your Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  onChange={onchange} />
                    </div>
                    <div className="form-group my-2" >
                        <label htmlFor="exampleInputPassword1">Enter Your Password</label>
                        <input type="password" className="form-control" id="password" name='password' required minLength={8} onChange={onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary my-2" >Submit</button>
                </form>
            </div>
        </>
    )
}
