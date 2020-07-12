import React from 'react'
import axios from 'axios'

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


    this.setState({
      image:(e.target.files[0])
    })
  }

  onSubmit(e){
    e.preventDefault()

    const formdata = new FormData()
    
    formdata.append('caption',this.state.caption)//key-value pair
    formdata.append('description',this.state.description)
    formdata.append('date', this.state.date)
    formdata.append('image',this.state.image)
    //creating  a formdata object

/*
    const image = {
      caption: this.state.caption,
      description: this.state.description,
      date: Date.now,
      image: this.state.image
      }
    
*/ //dont use this-- the form data object works better
    console.log(formdata)

    console.log('Image uploaded !')

    axios.post('http://localhost:3002/images',formdata)
      .then(res=>console.log(res.data))


    window.location = '/results'
    //this will go to the 'results' page--where the image is displayed

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
            <label>Choose a File</label>
            <input type="file" 
              className="form-control"
              onChange={this.onChangeImage}
              />

          </div>

          <div className="form-group">
            <input type="submit" value = "Upload Data" className = "btn btn-primary"/>
          </div>



        </form>
      </div>
    )
  }


}