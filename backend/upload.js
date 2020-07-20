

const util = require('util')

const multer = require('multer')

const express = require('express')

const router = express.Router()

const Image = require('./model/image')

const storageStrategy = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/')
  },
  filename: function(req,file,cb){
    cb(null,  file.originalname)
  },
})

const fileFilter = (req,file,cb) =>{
  if(file.mimetype === 'image/jpeg' || file.mimetype==='image/png'||file.mimetype==='image/jpg'){
    cb(null, true)
  }
  else{
    cb(new Error('Error: please enter an image of type jpg, jpeg, or png'),false)
   
  
  }
 
}

const upload = multer({ storage: storageStrategy, limits: {
  fileSize:1024*1024*20
},
fileFilter: fileFilter


})


//uploads a post
router.post('/',upload.single('image'),  async (req,res,next) =>{

 
  const image = new Image({

    caption:req.body.caption,
    description: req.body.description,
    image: req.file.path,
    prediction: req.body.prediction


  })
  image.save()
        .then(result=>{
          console.log(result)
          res.json(result)

        })





})

//gets back all the posts

router.get('/',async(req,res)=>{
  try{
    const images = await Image.find()
    res.json(images)
  }
  catch(err){
    res.json({message:err})
  }
})


//gets back a single post
router.get('/:postId',async (req,res)=>{
  try{
    const post = await Post.findById(req.params.postId)

    res.json(post)
  }
  catch(err){
    res.json({message:err})
  }
})


module.exports = router

