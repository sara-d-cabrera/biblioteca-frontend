import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditarPrestamo({ prestamo, onUpdate }) {
  const [formData, setFormData] = useState({
    usuario_id: prestamo.usuario_id,
    libro_id: prestamo.libro_id,
    fecha_prestamo: prestamo.fecha_prestamo,
    fecha_devolucion: prestamo.fecha_devolucion
  });

  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    axios.get('https://biblioteca-backend-p6ug.onrender.com/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));

    axios.get('https://biblioteca-backend-p6ug.onrender.com/libros')
      .then(res => setLibros(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://biblioteca-backend-p6ug.onrender.com/prestamos/${prestamo.id}`, formData)
      .then(res => {
        alert('Préstamo actualizado correctamente');
        onUpdate(); // refresca la lista de préstamos
      })
      .catch(err => console.error('Error al actualizar préstamo:', err));
  };

  return (
    <div>
      <h3>Editar Préstamo (ID: {prestamo.id})</h3>
      <form onSubmit={handleSubmit}>
        <select name="usuario_id" value={formData.usuario_id} onChange={handleChange} required>
          <option value="">Seleccione usuario</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.nombre} - {u.carrera}</option>
          ))}
        </select>

        <select name="libro_id" value={formData.libro_id} onChange={handleChange} required>
          <option value="">Seleccione libro</option>
          {libros.map(l => (
            <option key={l.id} value={l.id}>{l.titulo} ({l.autor})</option>
          ))}
        </select>

        <input 
          type="date" 
          name="fecha_prestamo" 
          value={formData.fecha_prestamo} 
          onChange={handleChange} 
          required 
        />
        
        <input 
          type="date" 
          name="fecha_devolucion" 
          value={formData.fecha_devolucion} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Actualizar Préstamo</button>
      </form>
    </div>
  );
}

export default EditarPrestamo;