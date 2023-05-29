import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

export default function Login(props) {
    const [credential, setCredential] = useState({ email: "", password: "" });

    let nevigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();

        if (json.success) {
            //redirect to home page
            localStorage.setItem("authToken", json.authToken);
            nevigate("/")
            props.showAlert("Login Successfully!", "success")
        }
        else {
            props.showAlert("Invalid Credentials ,Please Check Credentials", "danger")
        }

    }

    const onchange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }



    return (
        <>
            <div>
                <h1>Login For Access Your Important Notes.</h1>
                <form onSubmit={handleSubmit}>

                    <div className="form-group my-4">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} />

                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" name='password' required minLength={8} onChange={onchange} />
                    </div>

                    <button type="submit" className="btn btn-primary my-2" >Submit</button>
                </form>
            </div>
        </>
    )
}
