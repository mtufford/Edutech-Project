import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainView from './components/views/main_view/main_view.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faInfoCircle)

class App extends Component {
  render() {
    return (

      <div className="App">

      <MainView/>
      </div>
    );
  }
}

export default App;
