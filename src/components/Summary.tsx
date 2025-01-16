import React from 'react';
import { useEvaluationStore } from '../store/evaluationStore';
import { supabase } from '../lib/supabase';
import { Save, ArrowLeft, FileSearch, PencilRuler, Check } from 'lucide-react';

const getScoreColor = (score: number) => {
  if (score <= 2) return '🔴';
  if (score <= 4) return '🟠';
  if (score <= 6) return '🟡';
  if (score < 7) return '🟣';
  if (score < 9) return '🟢';
  return '🌟';
};

export const Summary: React.FC = () => {
  const { 
    projectTitle, 
    centralName, 
    gehName,
    guName,
    date, 
    criteria, 
    resetEvaluation,
    setCurrentStep,
    currentProjectId,
    isViewMode,
    setCriterionScore,
    setCriterionComment
  } = useEvaluationStore();

  const averageScore = Number((criteria.reduce((acc, curr) => acc + curr.score, 0) / criteria.length).toFixed(1));
  const criteriaWithComments = criteria.filter(c => c.comment.trim() !== '');

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('project_evaluations')
        .upsert({
          id: currentProjectId,
          project_title: projectTitle,
          central_name: centralName,
          geh_name: gehName,
          gu_name: guName,
          evaluation_date: new Date().toISOString().split('T')[0],
          criteria: criteria,
        });

      if (error) throw error;

      alert('Évaluation sauvegardée avec succès !');
      setCurrentStep(0);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
  };

  const handleReturnToMenu = () => {
    setCurrentStep(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          {isViewMode ? (
            <FileSearch className="h-8 w-8 text-blue-600" />
          ) : (
            <PencilRuler className="h-8 w-8 text-blue-600" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isViewMode ? 'Consultation de l\'Évaluation' : 'Modification de l\'Évaluation'}
        </h2>
      </div>
      
      {/* Project Info */}
      <div className="mb-6">
        <p className="text-gray-600"><strong>Projet :</strong> {projectTitle}</p>
        <p className="text-gray-600"><strong>Centrale :</strong> {centralName}</p>
        <p className="text-gray-600"><strong>GEH :</strong> {gehName}</p>
        <p className="text-gray-600"><strong>GU :</strong> {guName}</p>
        <p className="text-gray-600"><strong>Date :</strong> {date}</p>
      </div>

      {/* Average Score */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Note Moyenne</h3>
        <div className="text-3xl font-bold flex items-center gap-2">
          {averageScore}/10 {getScoreColor(averageScore)}
        </div>
      </div>

      {/* Scores Section */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes par Critère</h3>
        {criteria.map((criterion) => (
          <div key={criterion.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">{criterion.name}</span>
              {!isViewMode ? (
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={criterion.score}
                  onChange={(e) => setCriterionScore(criterion.id, parseInt(e.target.value))}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                />
              ) : (
                <span className="font-bold">
                  {criterion.score}/10 {getScoreColor(criterion.score)}
                </span>
              )}
            </div>
            {!isViewMode ? (
              <textarea
                value={criterion.comment}
                onChange={(e) => setCriterionComment(criterion.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                rows={2}
                placeholder="Ajouter un commentaire..."
              />
            ) : (
              criterion.comment && (
                <p className="text-gray-600 mt-2">{criterion.comment}</p>
              )
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        {!isViewMode && (
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enregistrer les modifications
            <Check className="ml-2 h-4 w-4" />
          </button>
        )}
        
        <button
          onClick={handleReturnToMenu}
          className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Retour au menu
          <ArrowLeft className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
