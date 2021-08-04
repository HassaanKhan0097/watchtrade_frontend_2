import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//BACKEND URL
// window.$base_api = 'http://localhost:5000'
window.$base_api = 'https://watchtradebackend.herokuapp.com'


//ADMIN URL
// window.$admin_api = 'http://localhost:3006'
window.$admin_api = 'https://watchtradeadmin.herokuapp.com'



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
