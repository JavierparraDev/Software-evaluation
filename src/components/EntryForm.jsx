import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EntryForm = () => {
  const [formData, setFormData] = useState({
    softwareName: '',
    ownerName: '',
    email: '',
    phone: '',
    generalObjective: '',
    specificObjective: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/evaluation');
  };

  return (
    <div>
      <h1>Formulario de Entrada</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Software:</label>
          <input
            type="text"
            name="softwareName"
            value={formData.softwareName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre del Propietario:</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Objetivo General:</label>
          <input
            type="text"
            name="generalObjective"
            value={formData.generalObjective}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Objetivo Específico:</label>
          <input
            type="text"
            name="specificObjective"
            value={formData.specificObjective}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Siguiente</button>
      </form>
    </div>
  );
};

export default EntryForm;
