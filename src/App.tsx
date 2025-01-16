import React from 'react';
import { useEvaluationStore } from './store/evaluationStore';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { ProjectInfo } from './components/ProjectInfo';
import { Evaluation } from './components/Evaluation';
import { Summary } from './components/Summary';

function App() {
  const { currentStep } = useEvaluationStore();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {currentStep === -1 && <Login />}
      {currentStep === 0 && <Home />}
      {currentStep === 1 && <ProjectInfo />}
      {currentStep === 2 && <Evaluation />}
      {currentStep === 3 && <Summary />}
    </div>
  );
}

export default App;
