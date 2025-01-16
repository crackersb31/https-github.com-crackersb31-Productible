// ... (le reste du fichier reste inchangé jusqu'aux boutons d'action)

<button
  onClick={() => handleViewProject(project)}
  className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50"
  title="Voir"
>
  <Eye className="h-5 w-5" />
</button>
<button
  onClick={() => handleEditProject(project)}
  className="p-2 text-gray-600 hover:text-green-600 rounded-full hover:bg-green-50"
  title="Modifier"
>
  <Edit2 className="h-5 w-5" />
</button>

// ... (le reste du fichier reste inchangé)
