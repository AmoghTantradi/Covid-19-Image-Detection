const express = require('express')

const cors = require('cors')

const app = express()



app.use((req,res,next)=>{
  console.log(`${new Date()} - ${req.method} request for ${req.url}`)
  next()
})

app.use(cors())

app.use(express.static('../static'))


app.listen(81,()=>{
  console.log('server started on port 81')
})