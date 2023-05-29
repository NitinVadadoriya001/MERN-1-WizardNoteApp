//it is store a user data (email,name,password) in db with validation

const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');



//Route-1 user register 
const JWT_SECRET = 'nitinisvery$hungry'
let success =false;
let userExit = false;
router.post('/createuser', [
    //for user inpute data validation.
    body('name', "name should be atleat 3 char long!").isLength({ min: 3 }),
    body('email', "enter valide email!").isEmail(),
    body('password', "password must be 8 char long!").isLength({ min: 8 })
], async (req, res) => {

    //make schema and save in db
    //attention when insert data about user email is unique...

    //for user inpute data validation.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {


        let user = await Users.findOne({ email: req.body.email });

        if (user) {
            userExit =true;
            return res.status(400).json({ error: "Sorry this email is already exit!!" ,userExit},)
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass

        })
        //send jwt token to user
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);


        success = true;
        res.json({ authToken ,success})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occure !")
    }
})

//Route-2 user login

router.post('/login', [
    //for user inpute data validation.
    body('email', "enter valide email!").isEmail(),
    body('password', "password must be 8 char long!").exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        let user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials!" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {

            return res.status(400).json({ error: "Please try to login with correct credentials!" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);


        success = true;
        res.json({ authToken ,success})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occure !")
    }
})


//Route-3 : get loggin user details using "/api/auth/getuser" 
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await Users.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occure !")
    }
})


module.exports = router