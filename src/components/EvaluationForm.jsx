import React, { useState } from 'react';
import UsabilityForm from './UsabilityForm';
import SecurityForm from './SecurityForm';
import PortabilityForm from './PortabilityForm';
import CompatibilityForm from './CompatibilityForm';

// Componente genérico para los formularios selectivos
const FormSelect = ({ name, label, value, onChange, required }) => (
  <div>
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange} required={required}>
      <option value="">Seleccione una opción</option>
      <option value="yes">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
);

const EvaluationForm = () => {
  const [evaluationData, setEvaluationData] = useState({
    usability: '',
    security: '',
    portability: '',
    compatibility: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluationData({
      ...evaluationData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(evaluationData);
    // Aquí podrías agregar lógica para enviar los datos a un servidor o API
  };

  return (
    <div>
      <h1>Formulario de Evaluación</h1>
      <form onSubmit={handleSubmit}>
        <FormSelect 
          name="usability" 
          label="Usabilidad:" 
          value={evaluationData.usability} 
          onChange={handleChange} 
          required 
        />
        <FormSelect 
          name="security" 
          label="Seguridad:" 
          value={evaluationData.security} 
          onChange={handleChange} 
          required 
        />
        <FormSelect 
          name="portability" 
          label="Portabilidad:" 
          value={evaluationData.portability} 
          onChange={handleChange} 
          required 
        />
        <FormSelect 
          name="compatibility" 
          label="Compatibilidad:" 
          value={evaluationData.compatibility} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Enviar</button>
      </form>

      {evaluationData.usability === 'yes' && <UsabilityForm />}
      {evaluationData.security === 'yes' && <SecurityForm />}
      {evaluationData.portability === 'yes' && <PortabilityForm />}
      {evaluationData.compatibility === 'yes' && <CompatibilityForm />}
    </div>
  );
};

export default EvaluationForm;
