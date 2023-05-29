//it return all user notes that was stored
const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
let success = false;

//Route-1 get all the notes using : get '/api/notes/fetchallnotes'
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    if(notes.length === 0){
        return res.send("There is no notes !")
    }
    res.json(notes)
})

//Route-2 add a new Note using : post '/api/notes/addnotes'
router.post('/addnotes', fetchuser, [
    //for user inpute data validation.
    body('title', "title should be atleat 3 char long!").isLength({ min: 3 }),

    body('description', "description must be 5 char long!").isLength({ min: 5 })
], async (req, res) => {

    try {



        const { title, description, tag,important } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id ,important
        })
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error !")
    }
})

//Route-3 update a existing  Note using : put '/api/notes/updatenote'
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a new node
    const newNote = {};
    if (title) {
        newNote.title = title
    }
    if (description) {
        newNote.description = description
    }
    if (tag) {
        newNote.tag = tag
    }

    try {



        //find the note to be update and update it
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("not found")
        }

        //if other person try to change other person notes..
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error !")
    }

})

//Route-4 Delete a existing  Note using : delete '/api/notes/deletenote'
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {



        //find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("not found")
        }

        //if other person try to change other person notes..
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        success = true;
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", DeletedNote: note ,success });
       

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error !")
    }

})


//Route-5 Delete a existing All Note using : delete '/api/notes/deleteAllNotes'
router.delete('/deleteAllNotes/:userId', fetchuser, async (req, res) => {

    try {

        //find the note to be delete and delete it
        let note = await Notes.deleteMany({"user":req.params.userId})
        console.log(note)

        if (!note) {
            return res.status(404).send("not found")
        }

        //if other person try to change other person notes..
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", DeletedNote: note,success });
       

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error !")
    }

})


module.exports = router