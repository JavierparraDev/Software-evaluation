import React, { useState } from 'react';
import UsabilityForm from './UsabilityForm';
import SecurityForm from './SecurityForm';
import PortabilityForm from './PortabilityForm';
import CompatibilityForm from './CompatibilityForm';

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
  };

  return (
    <div>
      <h1>Formulario de Evaluación</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usabilidad:</label>
          <select name="usability" value={evaluationData.usability} onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Seguridad:</label>
          <select name="security" value={evaluationData.security} onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Portabilidad:</label>
          <select name="portability" value={evaluationData.portability} onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Compatibilidad:</label>
          <select name="compatibility" value={evaluationData.compatibility} onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
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
