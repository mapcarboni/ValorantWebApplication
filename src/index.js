import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from './Principal/principal';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Principal />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);