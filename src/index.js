import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from './Principal/principal';
import Detalhes from './Detalhes/detalhes';
import Formulario from './Formulario/formulario';
import './global.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {/* Definição das rotas */}
      <Route path="/" element={<Principal />} />
      <Route path="/detalhes/:uuid" element={<Detalhes />} />
      <Route path="/formulario/:uuid" element={<Formulario />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);