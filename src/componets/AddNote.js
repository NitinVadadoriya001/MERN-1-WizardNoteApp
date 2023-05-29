import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';


export default function AddNote() {
    const context = useContext(noteContext);
    const { addNote, notes, setNotes, deleteAllNotes } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const [important, setImportant] = useState(false);

    const handleChange = (event) => {
        setImportant(event.target.checked);

    }

    const handleClick = (e) => {

        e.preventDefault();

        addNote(note.title, note.description, note.tag, important);
        setNote(({ title: "", description: "", tag: "" }));
        setImportant(false);
    }

    const handleDeletAll = (e) => {
        e.preventDefault();
        deleteAllNotes(notes[0].user)
        setNotes([]);
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
                    </div>
                    <div class="form-check">
                        <input type="checkbox" id='important' name="important" onChange={handleChange} />
                        <label className="form-check-label mx-2" htmlFor="exampleCheck1">Important Note</label>
                    </div>
                    <button type="submit" disabled={(note.title.length < 5 | note.description.length < 5) ? true : false} className="btn btn-primary my-2" onClick={handleClick}>Add Note</button>
                    <button type="button" disabled={(notes.length) ? false : true} className="btn btn-primary mx-2 my-2" onClick={handleDeletAll}>Delete All Note</button>
                </form>



            </div>

        </>
    )
}
