import React from 'react'

import './App.css';
import Detector from './Detector';
import Popup from './Popup'



//import Images from './Images'
/*import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'*/

function App() {

  //<Route path= "" exact component={}/>

  return (

      <div className="App">


      <Popup/>

      <Detector/>

      </div>


    
  )
}

export default App;


/*
perform api call to browser and pass the model prop to detector.js







*/