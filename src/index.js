import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from './Principal/principal';
import Detalhes from './Detalhes/detalhes';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/detalhes/:uuid" element={<Detalhes />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);