const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const port = process.env.PORT || 4000



//cros origines
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

//Accept json in req body
app.use(express.json())
app.use(cookieParser());


//Routes//
app.get("/", (req, res) => {
    res.status(200).send("This is my API")
})


//Connect to database and start listening
app.listen(port, () => {
    console.log("Listening on Port", port);
})
