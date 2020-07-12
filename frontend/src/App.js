import React from 'react';
import Images from './Images'
import InputImage from './InputImage'
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (

    <Router>

      <div className="App">
      
        <Switch>
        
        <Route path="/add" exact component={InputImage} />
        <Route path="/results" exact component={Images}/>

        </Switch>
      </div>

    </Router>
  )
}

export default App;
