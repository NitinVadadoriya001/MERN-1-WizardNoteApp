import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const d = new Date(note.Date);
    let date = d.getDate();
    date = date + "-" + d.getMonth();
    date = date + "-" + d.getFullYear();

    return (

        <div className="col-md-3" key={note._id}>
            <div className={note.important ? "card my-4 bg-warning" :"card my-4 "}>
                <h5 className="card-header">{note.title}</h5>
                <div className="card-body">
                    <h6 className="card-title"><b>Date : </b>{date}</h6>
                    <p className="card-text"><b>Des. : </b>{note.description}</p>
                    <p className="card-text"><b>Tag : </b>{note.tag}</p>

                    <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

