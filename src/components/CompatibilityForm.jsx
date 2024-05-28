import React, { useState } from 'react';

const questions = [
  { id: 'C1', text: '¿Es posible utilizar los recursos de la computadora por otros sistemas mientras se utiliza el sistema?' },
  { id: 'C2', text: '¿Es posible ejecutar el sistema si se están ejecutando otros?' },
  { id: 'C3', text: '¿Se producen resultados inesperados al ejecutar?' },
  { id: 'C4', text: '¿El sistema permite intercambiar información con otros sistemas?' },
  { id: 'C5', text: '¿Es posible utilizar información brindada por otro sistema?' },
  { id: 'C6', text: '¿La información del sistema puede ser utilizada por otro sistema?' },
  { id: 'C7', text: '¿Se producen errores de algún tipo al intentar utilizar información compartida con otros sistemas?' },
  { id: 'C8', text: '¿La funcionalidad del sistema se ve alterada por el uso de otro sistema al mismo tiempo?' },
];

const CompatibilityForm = () => {
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

    // Coexistencia entre sistemas (C-C1)
    if (answers.C2 === 'false') {
      totalScore += 0;
    } else if (answers.C2 === 'true' && answers.C8 === 'false') {
      totalScore += 1;
    } else if (answers.C2 === 'true' && answers.C8 === 'true') {
      totalScore += 0.25;
    }

    // Utilización de Recursos (C-C2)
    if (answers.C1 === 'true') {
      totalScore += 1;
    }

    // Errores Inesperados (C-C3)
    if (answers.C3 === 'true') {
      totalScore += 1;
    }

    // Intercambio de Información (C14)
    if (answers.C4 === 'false') {
      totalScore += 0;
    } else if (answers.C4 === 'true' && answers.C5 === 'true' && answers.C6 === 'true') {
      totalScore += 1;
    } else if ((answers.C4 === 'true' && answers.C5 === 'true') || (answers.C4 === 'true' && answers.C6 === 'true')) {
      totalScore += 0.75;
    }

    // Errores Inesperados (C15)
    if (answers.C7 === 'false') {
      totalScore += 1;
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
      <h2>Formulario de Compatibilidad</h2>
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
          <h3>Puntaje total de compatibilidad: {score}</h3>
        </div>
      )}
    </div>
  );
};

export default CompatibilityForm;
