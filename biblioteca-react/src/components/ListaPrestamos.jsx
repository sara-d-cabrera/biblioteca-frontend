import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditarPrestamo from './EditarPrestamo';

function ListaPrestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);

  const cargarPrestamos = () => {
    axios.get('https://biblioteca-backend-p6ug.onrender.com/prestamos')
      .then(res => setPrestamos(res.data))
      .catch(err => console.error('Error al obtener préstamos:', err));
  };

  useEffect(() => {
    cargarPrestamos();
  }, []);

  const eliminarPrestamo = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este préstamo?')) {
      axios.delete(`https://biblioteca-backend-p6ug.onrender.com/prestamos/${id}`)
        .then(res => {
          alert('Préstamo eliminado correctamente');
          cargarPrestamos(); // refrescar la lista
        })
        .catch(err => console.error('Error al eliminar préstamo:', err));
    }
  };

  return (
    <div>
      <h2>Préstamos de Libros</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Libro</th>
            <th>Autor</th>
            <th>Fecha de Préstamo</th>
            <th>Fecha de Devolución</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map(p => (
            <tr key={p.id}>
              <td>{p.usuario}</td>
              <td>{p.libro}</td>
              <td>{p.autor}</td>
              <td>{p.fecha_prestamo}</td>
              <td>{p.fecha_devolucion}</td>
              <td>
                <button onClick={() => setPrestamoSeleccionado(p)}>Editar</button>
                <button onClick={() => eliminarPrestamo(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {prestamoSeleccionado && (
        <EditarPrestamo 
          prestamo={prestamoSeleccionado} 
          onUpdate={() => {
            setPrestamoSeleccionado(null);
            cargarPrestamos();
          }} 
        />
      )}
    </div>
  );
}

export default ListaPrestamos;