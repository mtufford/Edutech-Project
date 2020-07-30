/*
This is the main entry point.  There should only
be one React component here.

*/

require('core-js');
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
require('./App.css');
import 'bootstrap/dist/css/bootstrap.min.css';

function mainAppDiv(){


      var element = document.createElement('div')
      element.id = 'app'
      return element;

  }
document.body.appendChild(mainAppDiv());

console.log(`
   ██████╗███████╗ ██████╗ ██╗  ██╗ ██████╗  ██████╗
  ██╔════╝██╔════╝██╔════╝ ██║  ██║██╔════╝ ██╔═████╗
  ██║     ███████╗███████╗ ███████║███████╗ ██║██╔██║
  ██║     ╚════██║██╔═══██╗╚════██║██╔═══██╗████╔╝██║
  ╚██████╗███████║╚██████╔╝     ██║╚██████╔╝╚██████╔╝
   ╚═════╝╚══════╝ ╚═════╝      ╚═╝ ╚═════╝  ╚═════╝
`)

window.addEventListener('load', function(){
  document.title='CompSciSearch';
});

ReactDom.render(
<App />,
document.querySelector('#app'));
