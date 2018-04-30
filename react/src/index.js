import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
/*
function storageAvailable(type) {
  try {
      var storage = window[type],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage.length !== 0;
  }
}

function handleLoginGoogle(event) {
  //event.preventDefault();
  if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    console.log('Yes localStorage')
    axios.get('isLoggedIn')
    .then((response) => {
      console.log(response);
      const token = response.data;
      //localStorage.setItem("token", token);
      console.log(token);
      if (token.username) {
        localStorage.setItem("token", JSON.stringify(token));
        console.log('token data: ', JSON.parse(localStorage.getItem('token')));
      } else {
        localStorage.setItem("token", null)
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  else {
    // Too bad, no localStorage for us
    console.log('No localStorage')
  }
};
*/
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'));

//registerServiceWorker();
//handleLoginGoogle(); Testing this for /auth/google fix (currently blank screen as of 4/30/2018)
