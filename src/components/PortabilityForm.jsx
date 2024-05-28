import React, { useState } from 'react';

const questions = [
  { id: 'P1', text: '¿El sistema posee una aplicación móvil?' },
  { id: 'P2', text: '¿El sistema funciona correctamente en diferentes computadoras con diferentes características?' },
  { id: 'P3', text: '¿El sistema se utiliza correctamente en un navegador de una tablet?' },
  { id: 'P4', text: '¿El sistema puede ser utilizado en dispositivos con cualquier sistema operativo?' },
  { id: 'P5', text: '¿El sistema funciona correctamente en cualquier navegador de internet?' },
  { id: 'P6', text: '¿El sistema funciona correctamente en el navegador de un dispositivo móvil?' },
];

const PortabilityForm = () => {
  const [answers, setAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question.id] = '';
      return acc;
    }, {})
  );
  const [score, setScore] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const calculateScore = () => {
    let totalScore = 0;

    // Web Responsive (P-A1)
    if (answers.P4 === 'true' && answers.P6 === 'true') {
      totalScore += 1;
    } else if (answers.P3 === 'true' || answers.P6 === 'true') {
      totalScore += 0.5;
    }

    // Aplicación Móvil (P-A2)
    if (answers.P1 === 'true') {
      totalScore += 1;
    }

    // Adaptación al Hardware (P-A3)
    if (answers.P2 === 'true') {
      totalScore += 1;
    }

    // Adaptación al Software (P-A4)
    if (answers.P4 === 'true' && answers.P5 === 'true') {
      totalScore += 1;
    } else if (answers.P4 === 'true' || answers.P5 === 'true') {
      totalScore += 0.75;
    }

    return totalScore;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalScore = calculateScore();
    setScore(totalScore);
  };

  return (
    <div>
      <h2>Formulario de Portabilidad</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <label>
              <strong>{question.id}</strong>: {question.text}
            </label>
            <select
              name={question.id}
              value={answers[question.id]}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="true">Verdadero</option>
              <option value="false">Falso</option>
            </select>
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
      {score !== null && (
        <div>
          <h3>Puntaje total de portabilidad: {score}</h3>
        </div>
      )}
    </div>
  );
};

export default PortabilityForm;
