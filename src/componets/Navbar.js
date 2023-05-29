import React, { useEffect ,useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import noteContext from '../context/notes/noteContext';


const Navbar = (props) => {
    let location = useLocation();
    const context = useContext(noteContext);
    const { notes ,setNotes} = context;
    const notesInitial = []
    
    
    let nevigate = useNavigate();

   const handleLogout = ()=>{
        localStorage.removeItem("authToken");
        nevigate('/login');
        props.showAlert("Logout successfuly!","success")
        setNotes(notesInitial);

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Wizard-Note-App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {
                        !localStorage.getItem('authToken') ?
                            <form className="d-flex" >
                                <Link className='btn btn-primary ' to="/login" role="button">Login</Link>
                                <Link className='btn btn-primary mx-2' to="/signup" role="button">SignUp</Link>
                            </form>
                            : <button type="button" onClick={handleLogout} className="btn btn-primary">Logout</button>

                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
