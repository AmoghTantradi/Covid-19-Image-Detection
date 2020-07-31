const express = require('express')
const cors = require('cors')

const app = express()
const PORT =  process.env.PORT || 81



app.use((req,res, next)=>{
  console.log(`${new Date()} - ${req.method} request for ${req.url}`)
  next()
})

app.use(cors())

app.use(express.static('../static'))

app.listen(PORT,()=>{
  console.log(`server started on port: ${PORT}`)
})