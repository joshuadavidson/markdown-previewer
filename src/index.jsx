/* establish global variables for ESLint */
/* global document */

// React
import React from 'react';
import ReactDOM from 'react-dom';
// import jquery and bootstrap js
import 'jquery';
import 'bootstrap';
// import custom styles for project
import './index.scss';

ReactDOM.render(
  <h1>Hello World!</h1>,
  document.getElementById('app'),
);
