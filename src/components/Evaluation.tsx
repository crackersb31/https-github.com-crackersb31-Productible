import React from 'react';
import { useEvaluationStore, type Criterion } from '../store/evaluationStore';
import { Check } from 'lucide-react';

const getScoreColor = (score: number) => {
  if (score <= 2) return '🔴';
  if (score <= 4) return '🟠';
  if (score === 5) return '🟡';
  if (score === 6) return '🟣';
  if (score <= 8) return '🟢';
  return '🌟';
};

export const Evaluation: React.FC = () => {
  const { criteria, setCriterionScore, setCriterionComment, setCurrentStep } = useEvaluationStore();

  const handleComplete = () => {
    const allScored = criteria.every((c) => c.score > 0);
    if (allScored) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Évaluation des Critères</h2>
      <div className="space-y-8">
        {criteria.map((criterion: Criterion) => (
          <div key={criterion.id} className="space-y-3 pb-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {criterion.name} {getScoreColor(criterion.score)}
              </label>
              <span className="text-sm font-bold text-gray-600">{criterion.score}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={criterion.score}
              onChange={(e) => setCriterionScore(criterion.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div>
              <label 
                htmlFor={`comment-${criterion.id}`} 
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Commentaires éventuels
              </label>
              <textarea
                id={`comment-${criterion.id}`}
                value={criterion.comment}
                onChange={(e) => setCriterionComment(criterion.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                rows={2}
                placeholder="Ajoutez vos commentaires ici..."
              />
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleComplete}
        className="mt-8 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Terminer l'évaluation
        <Check className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};
