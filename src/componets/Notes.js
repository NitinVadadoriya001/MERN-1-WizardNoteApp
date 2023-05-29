import React, { useContext, useState, useEffect, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) { 
    let nevigate = useNavigate();

    const context = useContext(noteContext);
    const { notes, addNote, getNotes, editNote } = context;
    const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    useEffect(() => {
        if(localStorage.getItem("authToken")){

            getNotes();
        }else{
            nevigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const refClose = useRef(null);
    const ref = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNotes({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {

        
        editNote(note.id, note.etitle, note.edescription, note.etag);
        ref.current.click();
    }
    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>

            <button type="button" className="d-none btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={(note.etitle.length < 5 | note.edescription.length < 5) ? true : false} onClick={handleClick} className="btn btn-primary">Update changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddNote />
            <div className="container my-4 row">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && "You Can Add Your Notes Using Add-Note Button!"}
                </div>
                {

                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} />

                    })
                }
            </div>

        </>
    )
}

