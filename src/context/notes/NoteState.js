
import react, { useState } from "react";
import NoteContext from "./noteContext";
// import Alert from "../../componets/Alert";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);


  //fetch all Notes
  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("authToken")
      }
    });
    const json = await response.json();

    console.log(json);
    setNotes(json)
  }

  //Add a Notes
  const addNote = async (title, description, tag,important) => {

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("authToken")
      },
      body: JSON.stringify({ title, description, tag ,important})
    });
    const note = await response.json();
    props.showAlert("Note added successfuly!","success");
    setNotes(notes.concat(note));
  }

  //Drop a Notes
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("authToken")
      }
    });
    // const json = await response.json();

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    props.showAlert("Note is delete successfuly!","success");

  }

  //Drop a All Notes
  const deleteAllNotes = async (userId) => {

    const response = await fetch(`${host}/api/notes/deleteAllNotes/${userId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("authToken")
      }
    });
    // const json = await response.json();

    
    setNotes([])
    props.showAlert("Note is delete successfuly!","success");

  }

  //Edit a Notes
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("authToken")
      },
      body: JSON.stringify({ title, description, tag })
    });

    // const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
      setNotes(newNotes);

    }
    props.showAlert("Note is updated successfuly!","success");

  }


  return (
    <NoteContext.Provider value={{ deleteAllNotes,notes, deleteNote, editNote, addNote, getNotes ,setNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;