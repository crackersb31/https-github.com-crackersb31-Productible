import React from 'react';
import { useEvaluationStore } from '../store/evaluationStore';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const ProjectInfo: React.FC = () => {
  const { 
    projectTitle, 
    centralName, 
    gehName,
    guName,
    date, 
    setProjectInfo, 
    setCurrentStep 
  } = useEvaluationStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectTitle && centralName && gehName && guName) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentStep(0)}
          className="mr-4 p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50"
          title="Retour"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Évaluation de Projet</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">
            Intitulé du Projet
          </label>
          <input
            type="text"
            id="projectTitle"
            value={projectTitle}
            onChange={(e) => setProjectInfo(e.target.value, centralName, gehName, guName)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="centralName" className="block text-sm font-medium text-gray-700">
            Nom de la Centrale
          </label>
          <input
            type="text"
            id="centralName"
            value={centralName}
            onChange={(e) => setProjectInfo(projectTitle, e.target.value, gehName, guName)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="gehName" className="block text-sm font-medium text-gray-700">
            Nom du GEH
          </label>
          <input
            type="text"
            id="gehName"
            value={gehName}
            onChange={(e) => setProjectInfo(projectTitle, centralName, e.target.value, guName)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="guName" className="block text-sm font-medium text-gray-700">
            Nom du GU
          </label>
          <input
            type="text"
            id="guName"
            value={guName}
            onChange={(e) => setProjectInfo(projectTitle, centralName, gehName, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continuer
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
