import React from 'react';
import ListaPrestamos from './components/ListaPrestamos';
import FormularioPrestamo from './components/FormularioPrestamo';

function App() {
  return (
    <div>
      <h1>Sistema de Gestión de Biblioteca</h1>
      <FormularioPrestamo />
      <hr />
      <ListaPrestamos />
    </div>
  );
}

export default App;