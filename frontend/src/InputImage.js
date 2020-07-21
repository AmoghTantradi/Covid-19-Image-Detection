import React from 'react'
import axios from 'axios'
import * as tf from '@tensorflow/tfjs';





export default class InputImage extends React.Component{

  constructor(props){
    super(props)


    this.onChangeCaption = this.onChangeCaption.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onSubmit = this.onSubmit.bind(this)





    this.state = {
      caption:''
      ,
      description:''
      ,
      date:Date.now
      ,
      image:null
      ,
      prediction:''

    }
  }

  onChangeCaption(e){
    this.setState({
      caption:e.target.value
    })
  }

  onChangeDescription(e){
    this.setState({
      description:e.target.value
    })
  }

  onChangeImage(e){

    const reader = new FileReader()

    reader.onload = ()=>{
      let dataURL= reader.result
      let imgComp = document.querySelector("#image")
      imgComp.setAttribute("src",dataURL)//this works
      imgComp.setAttribute("width","300")
      imgComp.setAttribute("height","300")
      //formatting the witdth and height of the image
    }

    let file = e.target.files[0]

    this.setState({
      image:(file)
    })
 
    console.log('image',file)
 
    reader.readAsDataURL(file)
   
  }

  refresh(){
    window.location = '/add'
  }



  async onSubmit(e){
    e.preventDefault()

   const model =  await tf.loadLayersModel('http://localhost:81/model/model.json')
   
    
   console.log('loaded model')
  
   const image = new Image()
   
   const imageComp = document.querySelector("#image")

   const predictComp= document.querySelector("#predictions")

   image.src = imageComp.getAttribute("src")

   console.log('image',image)

   const tensor =  tf.browser.fromPixels(image)
         .resizeNearestNeighbor([224,224])
         .toFloat()
         .expandDims()

  

   const predictions = await  model.predict(tensor).data()
     
   console.log(predictions)
   //now we have to add out predictions to our div

   const predictValue = (predictions[0]===0)?' Covid case':'Not a Covid case'

   this.setState({
     prediction:predictValue
   })

   predictComp.innerHTML = this.state.prediction
  
    
    const formdata = new FormData()
    formdata.append('caption',this.state.caption)//key-value pair
    formdata.append('description',this.state.description)
    formdata.append('date', this.state.date)
    formdata.append('image',this.state.image)
    formdata.append('prediction',this.state.prediction)
   
    
    //creating  a formdata object

    console.log('Image uploaded !')

   axios.post('http://localhost:3002/images',formdata)
      .then(res=>console.log(res.data))

  }

  
  render(){
    return(
      
      <div>
        <form onSubmit = {this.onSubmit}>
          <div className="form-group">
            <label>Caption:</label>
            <input type="text"
                required
                className="form-control"
                value={this.state.caption}
                onChange={this.onChangeCaption}
                />

          </div>    

          <div className="form-group">
            <label>Description:</label>
            <input type="text"
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
 
          </div>

          <div className="form-group">
           
            <input type="file" 
              required
              onChange={this.onChangeImage}
              />

          </div>

          <div className="form-group">
            <input type="submit" value = "Upload Data" className = "btn btn-primary"/>
          </div>

          <div className = "form-group">
            <input type="submit" value= "Clear Form" className = "btn btn-secondary"
            onClick = {this.refresh}
            />         
            </div>


        </form>

        <div >
          <img id="image" className="ml3" src="" alt ="" />
    <h1 id="predictions">{""}</h1>
        </div>
        
      </div>
      
    )
  }


}