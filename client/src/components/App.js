import React, { Component } from 'react';
import Nav from './Nav';
import Garden from './Garden.js';
import PlantInfo from './PlantInfo.js';
import './app.css';

class App extends Component{
  render () {
    return (
      <div>
        <Nav />
        <div id='garden-container'>
          <Garden />
        </div>
      </div>
    )
  }
}

export default App;