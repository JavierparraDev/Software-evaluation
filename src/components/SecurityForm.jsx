import React, { useState } from 'react';

const questions = [
  { id: 'S1', text: '¿Se requiere que la contraseña posea al menos 8 caracteres?' },
  { id: 'S2', text: '¿Se requiere que la contraseña posea letras mayúsculas y minúsculas?' },
  { id: 'S3', text: '¿Se requiere que la contraseña posea números y letras?' },
  { id: 'S4', text: '¿Se requiere que la contraseña posea caracteres especiales?' },
  { id: 'S5', text: '¿El sistema utiliza conexión segura mediante HTTPS?' },
  { id: 'S6', text: '¿La base de datos posee los datos encriptados?' },
  { id: 'S7', text: '¿El sistema permite acceder a funcionalidades en las cuales no se tiene permiso?' },
  { id: 'S8', text: '¿El sistema permite que cualquier persona tenga acceso a la base de datos?' },
  { id: 'S9', text: '¿El sistema permite que cualquier persona tenga acceso al código del servidor de la aplicación?' },
  { id: 'S10', text: '¿Cualquier persona tiene acceso al servidor físico?' },
  { id: 'S11', text: '¿Cualquier persona tiene acceso al servidor remoto?' },
  { id: 'S12', text: '¿El sistema posee redireccionamientos hacia sitios no seguros?' },
  { id: 'S13', text: '¿El sistema solicita una confirmación de registro mediante un mail a la hora de registrarse?' },
  { id: 'S14', text: '¿El sistema permite que cualquier persona pueda modificar la base de datos?' },
  { id: 'S15', text: '¿El sistema permite que cualquier persona pueda modificar el código del servidor de la aplicación?' },
  { id: 'S16', text: '¿El sistema permite inyecciones SQL?' },
  { id: 'S17', text: '¿El sistema posee un historial de acciones realizadas?' },
  { id: 'S18', text: '¿El sistema posee algoritmos de cifrado de datos?' },
  { id: 'S19', text: '¿El sistema posee un mecanismo criptográfico, como firma digital?' },
  { id: 'S20', text: '¿El sistema solicita confirmación a la hora de realizar una acción?' },
  { id: 'S21', text: '¿El sistema posee una protección con certificados SSL?' },
  { id: 'S22', text: '¿El sistema da aviso cuando se es accedido desde una ubicación desconocida?' },
  { id: 'S23', text: '¿El sistema informa vía mail las operaciones realizadas?' },
  { id: 'S24', text: '¿El sistema guarda un registro de fecha y hora de ingreso al mismo?' },
  { id: 'S25', text: '¿El sistema registra el tipo de navegador y sistema de operación utilizado para ingresar al sitio?' },
  { id: 'S26', text: '¿El sistema registra la dirección IP desde la cual se ingresa al sitio?' },
  { id: 'S27', text: '¿El sistema realiza una comprobación de identidad mediante un certificado digital?' },
  { id: 'S28', text: '¿El sistema posee un sistema de verificación en dos pasos?' },
  { id: 'S29', text: '¿Es requerida una clave de segundo nivel para el ingreso al sistema?' },
  { id: 'S30', text: '¿El sistema realiza una comprobación de identidad mediante datos biométricos?' },
  { id: 'S31', text: '¿El sistema realiza una comprobación de identidad mediante tarjeta de coordenadas?' },
  { id: 'S32', text: '¿El sistema realiza una comprobación de identidad mediante credenciales?' },
  { id: 'S33', text: '¿El sistema realiza una comprobación de identidad mediante una firma electrónica?' },
];

const SecurityForm = () => {
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

    // Confidencialidad
    if (answers.S5 === 'true' && answers.S12 === 'false') {
      totalScore += 1;
    }

    if (answers.S7 === 'false' && answers.S8 === 'false' && answers.S9 === 'false' && answers.S10 === 'false' && answers.S11 === 'false') {
      totalScore += 1;
    }

    if (answers.S6 === 'true') {
      totalScore += 1;
    }

    if (answers.S1 === 'true' && answers.S2 === 'true' && answers.S3 === 'true' && answers.S4 === 'true') {
      totalScore += 1;
    } else if (answers.S1 === 'true' || answers.S2 === 'true' || answers.S3 === 'true' || answers.S4 === 'true') {
      totalScore += 0.5;
    } else if (answers.S1 === 'false' && answers.S2 === 'false' && answers.S3 === 'false' && answers.S4 === 'false') {
      totalScore += 0;
    }

    // Integridad
    if (answers.S7 === 'false' && answers.S8 === 'false' && answers.S9 === 'false' && answers.S16 === 'false') {
      totalScore += 1;
    }

    if (answers.S14 === 'false' && answers.S15 === 'false') {
      totalScore += 1;
    }

    if (answers.S13 === 'true') {
      totalScore += 1;
    }

    // No-repudio
    if (answers.S17 === 'true' || answers.S23 === 'true') {
      totalScore += 1;
    }

    if (answers.S18 === 'true' || answers.S19 === 'true' || answers.S21 === 'true') {
      totalScore += 1;
    }

    if (answers.S20 === 'true') {
      totalScore += 1;
    }

    if (answers.S22 === 'true') {
      totalScore += 1;
    }

    // Responsabilidad
    if (answers.S17 === 'true' || answers.S24 === 'true' || answers.S25 === 'true' || answers.S26 === 'true') {
      totalScore += 1;
    }

    if (answers.S22 === 'true') {
      totalScore += 1;
    }

    // Autenticidad
    if (answers.S27 === 'true' || answers.S30 === 'true' || answers.S31 === 'true' || answers.S32 === 'true' || answers.S33 === 'true') {
      totalScore += 1;
    }

    if (answers.S28 === 'true' || answers.S29 === 'true' || answers.S13 === 'true') {
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
      <h2>Formulario de Seguridad</h2>
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
          <h3>Puntaje total de seguridad: {score}</h3>
        </div>
      )}
    </div>
  );
};

export default SecurityForm;
