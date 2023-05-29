import Navbar from "./componets/Navbar";
import { Route, Routes } from 'react-router-dom';
import Home from "./componets/Home";
import About from "./componets/About";
import NoteState from "./context/notes/NoteState";

import Login from "./componets/Login";
import SignUp from "./componets/SignUp";
import React, { useState } from 'react';
import Alert from './componets/Alert';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 2000);
  }

  return (
    <>
      <NoteState showAlert={showAlert}>

        <Navbar className="my-2" showAlert={showAlert}/>
        <Alert alert={alert} className="my-2"/>
        <div className="container my-3">

          <Routes>
            <Route excat path="/" element={<Home showAlert={showAlert}></Home>} />
            <Route excat path="/about" element={<About showAlert={showAlert}></About>} />
            <Route excat path="/login" element={<Login showAlert={showAlert}></Login>} />
            <Route excat path="/signup" element={<SignUp showAlert={showAlert}></SignUp>} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
