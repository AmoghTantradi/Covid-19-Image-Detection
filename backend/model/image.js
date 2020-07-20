
const mongoose = require('mongoose')


const imageSchema = mongoose.Schema({


  caption:{
    type:String,
    required:true,
  }
  ,
  description:{
    type:String,
    required:false
  }
  ,

  date:{
    type:Date,
    default:Date.now
  }
  ,
  image:{
    type:String,
    required: true
  }
  ,
  prediction:{
    type:String,
    required: true
  }





})

module.exports = mongoose.model('Image',imageSchema)

