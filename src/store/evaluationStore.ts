// ... (le reste du fichier reste inchangé jusqu'à la fonction loadProject)

loadProject: (project, viewMode = false) => {
  set({
    projectTitle: project.project_title,
    centralName: project.central_name,
    gehName: project.geh_name,
    guName: project.gu_name,
    date: project.evaluation_date,
    criteria: project.criteria,
    currentStep: 3, // Toujours rediriger vers la page de synthèse
    currentProjectId: project.id,
    isViewMode: viewMode,
  });
},

// ... (le reste du fichier reste inchangé)
