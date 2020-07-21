import React from 'react'
import Home from './Home'
import InputImage from './InputImage'
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//import Images from './Images'


function App() {
  return (

    <Router>

      <div className="App">

      
        
        <Switch>

       
        
        <Route path = "/" exact component={Home} />
        <Route path="/add" exact component={InputImage} />
        
        
        </Switch>
        
      </div>

    </Router>
    
  )
}

export default App;
