
//imports
const express = require('express')

const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const upload = require('./upload')

const cors = require('cors')

require('dotenv/config')//imports the hidden key


//connect to db

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology:true }, ()=>{
  console.log('Connected to Database')
})


//middlewares
app.use(cors())

app.use(bodyParser.json())

app.use('/uploads',express.static('uploads'))

app.use('/images',upload)//where we upload and retrieve uploaded images




app.listen(3002,()=>{
  console.log('started server')
})