import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/Pomodoro.css';
import Pomodoro from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
    <Pomodoro />
  </React.StrictMode>,
  document.getElementById('root')
);

<script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
