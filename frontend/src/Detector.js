import React from 'react'
import * as tf from '@tensorflow/tfjs'
import Header from './Header'
import Footer from './Footer'


export default class Detector extends React.Component{

  constructor(props){
    super(props)

    
    
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)

    this.state = {
      image:null

    }

  }

  onChangeImage(e){

    const imgComp = document.querySelector("#image")
    
   if(e.target.files[0] !== undefined){

      const reader = new FileReader()

      
      //this function is called after the file has been processed
      reader.onload = ()=>{
        const dataURL = reader.result
        imgComp.setAttribute("src",dataURL)
        imgComp.setAttribute("width","300")
        imgComp.setAttribute("height","300")
        //formatting the witdth and height of the image

      }

      const file = e.target.files[0]

      this.setState({
        image:(file)
      })

      console.log('image',file)
      
      reader.readAsDataURL(file)

    }
    else{
      imgComp.removeAttribute("src")
    }

  }


  resetForm(e){
    this.setState({
      image:null
    })

    const img = document.getElementById("image")
    img.setAttribute("src","")

    const predictions = document.getElementById("predictions")
    predictions.innerHTML = ''
    console.log(this.state)
  }

  async onSubmit(e){

    e.preventDefault()

    const model =  await tf.loadLayersModel('http://localhost:81/model/model.json')//making api call to get the model served by REST API
   
    
    console.log('loaded model')

    const image = new Image()

    const imageComp = document.getElementById("image")

    const predictComp = document.getElementById("predictions")

    image.src = imageComp.getAttribute("src")

    console.log('image',image)

    const tensor =  tf.browser.fromPixels(image)
         .resizeNearestNeighbor([224,224])
         .toFloat()
         .expandDims()
    

    const predictions = await model.predict(tensor).data()

    console.log(predictions)

    const predictValue = (predictions[0]===0)?'Covid case':'Not a Covid case'

    

    predictComp.innerHTML = predictValue



  }

  render(){

    return (
      <div>
        <Header />
        
        <form onSubmit = {this.onSubmit} >


          
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
            <input type="reset" value= "Clear Form" className = "btn btn-secondary"
            onClick= {this.resetForm}
            />         
          </div>


        </form>

        <div >

          <img id="image" className="ml3" src="" alt ="" />
          <h1 id="predictions">{""}</h1>

        </div>

        <Footer link={""} />

      </div>
    )
  }







}