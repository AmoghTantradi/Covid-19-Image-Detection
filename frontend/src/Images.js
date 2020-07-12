import React, {useState} from 'react'
import axios from 'axios'
import Image from './Image'



function Images(){

  const [images,setImages] = useState([])


  axios.get('http://localhost:3002/images') 
  .then(res=>{
    try{
      setImages(res.data)
      console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
  })


  
  return (

    <div className = "Images">

      {images.map( image => (
        <Image caption={image.caption} image={image.image}key={image.date}/>
      ))}
     

    </div>


  )
}




export default Images

