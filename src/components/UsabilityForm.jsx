import React, { useState } from 'react';

const questions = [
  { id: 'U1', text: '¿El sistema permite cambiar los colores del mismo para adecuarse a las necesidades de los usuarios?' },
  { id: 'U2', text: '¿El sistema permite cambiar el tamaño de la letra de sus textos?' },
  { id: 'U3', text: '¿El sistema está preparado para la lectura de pantalla con voz?' },
  { id: 'U4', text: '¿El sistema presenta textos difíciles de comprender?' },
  { id: 'U5', text: '¿El sistema posee textos con información irrelevante?' },
  { id: 'U6', text: '¿El sistema posee palabras y/o textos con faltas ortográficas?' },
  { id: 'U7', text: '¿El sistema permite deshacer una acción realizada?' },
  { id: 'U8', text: '¿El sistema presenta textos escritos en diferentes idiomas?' },
  { id: 'U9', text: '¿El sistema brinda la opción de cambiar el lenguaje del sitio a otro idioma?' },
  { id: 'U10', text: '¿El sistema posee una interfaz amigable? (El sitio puede entenderse y usarse fácilmente)' },
  { id: 'U11', text: '¿El sistema indica la sección en la que se encuentra el usuario?' },
  { id: 'U12', text: '¿El sistema indica las secciones accedidas hasta el momento?' },
  { id: 'U13', text: '¿El sistema posee más de un término para referirse a una misma acción? (Ej: Botón aceptar, botón confirmar, botón ok)' },
  { id: 'U14', text: '¿El contenido de los listados del sistema se organiza en páginas?' },
  { id: 'U15', text: '¿El sistema presenta consistencia de colores en todas sus secciones?' },
  { id: 'U16', text: '¿El sistema posee errores visuales? (Ej: elementos solapados, menúes desplegables sin funcionar, textos en lugares no destinados a ello, etc.)' },
  { id: 'U17', text: '¿El sistema informa mediante un mensaje si una operación fue realizada con éxito/sin éxito?' },
  { id: 'U18', text: '¿El sistema permite salir de alguna manera de cada sección? (Ej: Atrás, Cancelar, Salir, Volver)' },
  { id: 'U19', text: '¿El sistema posee atajos de teclado para el acceso a las diferentes funcionalidades?' },
  { id: 'U20', text: '¿El sistema posee íconos para el acceso a las diferentes funcionalidades?' },
  { id: 'U21', text: 'Ante una situación de error, ¿el sistema explica claramente cómo solucionar el error ocurrido?' },
  { id: 'U22', text: 'Ante una situación de error, ¿el sistema explica claramente el error ocurrido?' },
  { id: 'U23', text: 'Ante una situación de error, ¿el sistema explica claramente cómo prevenir que vuelva a ocurrir?' },
  { id: 'U24', text: 'Ante varias situaciones de error, ¿la interfaz del mensaje de error se mantiene consistente?' },
  { id: 'U25', text: 'A la hora de completar un formulario, ¿el sistema indica el tipo de información que se espera en cada uno de los campos?' },
  { id: 'U26', text: 'A la hora de completar un formulario, ¿el sistema indica cuáles de sus campos son obligatorios?' },
  { id: 'U27', text: 'A la hora de completar un formulario, ¿el sistema permite ingresar un tipo de información que difiere del esperado en un campo? (Ej: El sistema permite ingresar letras en un campo DNI)' },
  { id: 'U28', text: 'A la hora de completar un formulario, ¿existe información pre cargada en alguno de sus campos? (Ej: El campo país posee una lista desplegable con los diferentes países)' },
  { id: 'U29', text: 'En cada sección del sistema, ¿se brinda una pequeña ayuda sobre las acciones que el usuario puede realizar?' },
  { id: 'U30', text: '¿El sistema posee una sección de ayuda? (Ej: Manual de usuario)' },
  { id: 'U31', text: '¿El sistema posee una sección de preguntas frecuentes?' },
  { id: 'U32', text: 'Al utilizar la ayuda provista por el sistema, ¿se pudo resolver la inquietud exitosamente?' },
  { id: 'U33', text: '¿El sistema provee un acceso rápido a la ayuda?' },
];

const formulas = {
  'U-AC1': [
    { formula: (answers) => answers.U3 === 'true', score: 0.5 },
    { formula: (answers) => answers.U3 === 'true' && (answers.U1 === 'true' || answers.U2 === 'true'), score: 0.75 },
    { formula: (answers) => (answers.U1 === 'true' || answers.U2 === 'true') && answers.U3 === 'true', score: 0.25 },
    { formula: (answers) => answers.U1 === 'true' && answers.U2 === 'true' && answers.U3 === 'true', score: 1 }
  ],
  'U-AC2': [
    { formula: (answers) => answers.U19 === 'true', score: 1 }
  ],
  'U-AC3': [
    { formula: (answers) => answers.U8 === 'false' && answers.U9 === 'true', score: 1 },
    { formula: (answers) => answers.U8 === 'false' || answers.U9 === 'true', score: 0.75 }
  ],
  'U-AP4': [
    { formula: (answers) => answers.U11 === 'true', score: 0.75 },
    { formula: (answers) => answers.U12 === 'true', score: 0.5 },
    { formula: (answers) => answers.U11 === 'true' && answers.U12 === 'true', score: 1 }
  ],
  'U-AP5': [
    { formula: (answers) => answers.U30 === 'true' || answers.U31 === 'true' || answers.U29 === 'true', score: 1 }
  ],
  'U-AP6': [
    { formula: (answers) => answers.U26 === 'true', score: 1 }
  ],
  'U-AP7': [
    { formula: (answers) => answers.U25 === 'true' && answers.U27 === 'false' && answers.U29 === 'true', score: 1 },
    { formula: (answers) => answers.U27 === 'false' && answers.U28 === 'true', score: 0.75 },
    { formula: (answers) => answers.U27 === 'false' || answers.U28 === 'true', score: 0.5 },
    { formula: (answers) => answers.U25 === 'true', score: 0.25 }
  ],
  'U-AP8': [
    { formula: (answers) => answers.U21 === 'true' && answers.U22 === 'true' && answers.U23 === 'true', score: 1 },
    { formula: (answers) => answers.U21 === 'true' && answers.U22 === 'true', score: 0.75 }
  ],
  'U-E9': [
    { formula: (answers) => answers.U16 === 'false', score: 1 }
  ],
  'U-E10': [
    { formula: (answers) => answers.U10 === 'true' && answers.U14 === 'true', score: 1 },
    { formula: (answers) => answers.U10 === 'true', score: 1 },
    { formula: (answers) => answers.U14 === 'true', score: 0.25 }
  ],
  'U-E11': [
    { formula: (answers) => answers.U15 === 'true', score: 1 }
  ],
  'U-E12': [
    { formula: (answers) => answers.U17 === 'true', score: 1 }
  ],
  'U-E13': [
    { formula: (answers) => answers.U18 === 'true', score: 1 }
  ],
  'U-E14': [
    { formula: (answers) => answers.U7 === 'true', score: 1 }
  ],
  'U-E15': [
    { formula: (answers) => answers.U13 === 'true', score: 0.25 }
  ],
  'U-E16': [
    { formula: (answers) => answers.U4 === 'true' || answers.U5 === 'true', score: 0.25 },
    { formula: (answers) => answers.U4 === 'true' && answers.U5 === 'true', score: 0.5 }
  ],
  'U-E17': [
    { formula: (answers) => answers.U6 === 'true', score: 0.25 }
  ],
  'U-E18': [
    { formula: (answers) => answers.U32 === 'true', score: 1 }
  ],
  'U-E19': [
    { formula: (answers) => answers.U20 === 'true', score: 1 }
  ],
  'U-E20': [
    { formula: (answers) => answers.U24 === 'true', score: 1 }
  ],
  'U-E21': [
    { formula: (answers) => answers.U33 === 'true', score: 1 }
  ]
};


const UsabilityForm = () => {
  const [answers, setAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question.id] = '';
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const scores = {};

    Object.keys(formulas).forEach((id) => {
      formulas[id].forEach(({ formula, score }) => {
        if (formula(answers)) {
          scores[id] = Math.max(scores[id] || 0, score); // Guardar el puntaje máximo para cada subcaracterística
        }
      });
    });

    console.log(scores); // Aquí se mostrarán los puntajes calculados para cada subcaracterística
  };

  return (
    <div>
      <h2>Formulario de Usabilidad</h2>
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
    </div>
  );
};

export default UsabilityForm;
