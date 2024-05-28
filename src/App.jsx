import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EntryForm from './components/EntryForm';
import EvaluationForm from './components/EvaluationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryForm />} />
        <Route path="/evaluation" element={<EvaluationForm />} />
      </Routes>
    </Router>
  );
}

export default App;



