import React from 'react'
import * as tf from '@tensorflow/tfjs'
import {Cam,drawconv_map,destroyPlot} from './Cam'
import Header from './Header'
import Footer from './Footer'


export default class Detector extends React.Component{

  constructor(props){
    super(props)

    
    
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    
    this.model = null
  

    this.state = {
      image:null,
    }

    this.init()

  }

  async init(){
    this.model = await tf.loadLayersModel('http://localhost:4000/model/model.json')//making api call to get the model served by REST API
    console.log('loaded model', this.model)
  }

  onChangeImage(e){

    const imgComp = document.querySelector("#image")

    const predictions = document.getElementById("predictions")
    
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
      predictions.innerHTML = ''
      destroyPlot('tc_0')//clears cam
    }
 
  }

  resetForm(e){
    this.setState({
      image:null
    })//this happens after the function has ended

    const img = document.getElementById("image")
    img.setAttribute("src","") //clears uploaded image

    const predictions = document.getElementById("predictions")
    predictions.innerHTML = '' //clears predictions

    destroyPlot('tc_0')//clears cam

    console.log(this.state)

    
  }

  async onSubmit(e){

    e.preventDefault()


    const image = new Image()

    const imageComp = document.getElementById("image")

    const predictComp = document.getElementById("predictions")

    image.src = imageComp.getAttribute("src")

    console.log('image',image)

  
    const tensor =  tf.browser.fromPixels(image)
         .resizeNearestNeighbor([224,224])
         .toFloat()
         .expandDims()
         //preprocessing the image into a tensor of rank 4

    let  input = []

    console.log('Layers of my model',this.model.layers)

    console.log('input',input)
    

    for(let i = 0; i < this.model.layers.length;i++){

      if(i === 0 ){
        input.push(this.model.layers[i].apply(tensor))
      }
      else{
      input.push(this.model.layers[i].apply(input[i-1]))
      }
        
    }
    //this will store the output of each ith layer


    console.log('outputs of each layer in my model (starting from index 0 (from the first layer of my model)', input)

    let lastLayerIndex = this.model.layers.length - 1;
    
    while (lastLayerIndex >= 0) {
      if (this.model.layers[lastLayerIndex].getClassName().startsWith('Conv')) {
        break;
      }
      lastLayerIndex--;
    }
    //finding the last layer 

    //finding and declaring the lastlayer(before the output layer)
    const lastLayer = this.model.layers[lastLayerIndex]
    const lastLayerOutput = input[lastLayerIndex]

    //finding the predictions/final output
    const predictions = await input[input.length-1].data()
    const predictValue = (predictions[0]===0)?'Covid case':'Not a Covid case'
    predictComp.innerHTML = predictValue

    console.log('last conv layer:',lastLayer,'last conv layer output',lastLayerOutput)

    //converting the rank 4 tensor into a rank 3 tensor
    const lastLayerList = tf.tidy(()=>{
      return tf.unstack(lastLayerOutput.reshape([lastLayerOutput.shape[1],lastLayerOutput.shape[2],lastLayerOutput.shape[3]]),2)
    }
    )
    
    console.log('last conv list',lastLayerList)


    //plotting one slice of the class activation map
    const img = tf.reverse2d(tf.reverse2d(lastLayerList[0],1))
    drawconv_map(Array.from(img.dataSync()),"tc_"+0,lastLayerOutput.shape[1],lastLayerOutput.shape[2],300,300)
    img.dispose()
    
 
    

/*

If we wanted to plot all sections of the class activation map, we would do

    for(let i = 0 ; i < lastLayerOutput.shape[3];i++){
      const img = tf.reverse2d(lastLayerList[0])
      drawconv_map(Array.from(img.dataSync()),'tc_'+i,lastLayerOutput.shape[1],lastLayerOutput.shape[2],300,300)
    }
    to plot the cam using plotly.js, we have to have a div with an id that is the name of the graph node in plotly
*/
  }

  render(){

    return (
      <div>
        <Header />
        
        <form onSubmit = {this.onSubmit} >


          
          <div className="form-group">
            
            <input type="file"
              required
              accept=".jpeg,.jpg,.png"
              onChange={this.onChangeImage}
              />

          </div>


          <div className="form-group">
            <input type="submit" value = "Upload PAN X-ray" className = "btn btn-primary"/>
          </div>

          <div className = "form-group">
            <input type="reset" value= "Clear Form" className = "btn btn-secondary"
            onClick= {this.resetForm}
            />         
          </div>


        </form>

        <div  style={{float:'left'}} >


          <h1 id="predictions">{""}</h1>
          <img id="image" className="ml3" src="" alt =""/> 
          

         
        </div>

        <Cam />

        <Footer link={""} />

        </div>

    )
  }

}