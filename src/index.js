import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from './Principal/principal';
import Detalhes from './Detalhes/detalhes';
import Formulario from './Formulario/formulario';

// Definição dos estilos globais
const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
  },
  div: {
    backgroundImage: 'linear-gradient(to right, rgb(247, 194, 223), #FF4763)',
    padding: '0.5rem',
  },
};

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

// Aplicar estilos globais aos elementos
Object.keys(globalStyles).forEach(selector => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    Object.assign(element.style, globalStyles[selector]);
  });
});