//it is entry point of this app

var cors = require('cors')
const connectTOMongo = require('./db');
const express = require('express')

connectTOMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

//all routes will fetch from seperate files.....
//it is basically API..

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))





//just for know server is start or not..

app.listen(port, () => {
  console.log(`WizardNoteapp backend listening on http://localhost:${port}/`)
})