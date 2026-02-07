import { useState } from 'react'
import { Trash2 } from 'lucide-react'

export default function ProjectManager({
  projects,
  onAddProject,
  onDeleteProject,
  onSelectProject,
}) {
  const [projectName, setProjectName] = useState('')

  const handleAddProject = (e) => {
    e.preventDefault()
    if (projectName.trim()) {
      onAddProject(projectName.trim())
      setProjectName('')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📁 Управління проєктами</h2>

      {/* Add New Project */}
      <form onSubmit={handleAddProject} className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">➕ Новий проєкт</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Введіть назву проєкту"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Створити
          </button>
        </div>
      </form>

      {/* Projects List */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Мої проєкти ({projects.length})
      </h3>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-500">Проєктів не створено</p>
          <p className="text-gray-400 text-sm mt-2">Створіть перший проєкт вище</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1" onClick={() => onSelectProject(project)}>
                  <h4 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                    {project.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Створено: {new Date(project.createdAt).toLocaleDateString('uk-UA')}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm(`Видалити проєкт "${project.name}"?`)) {
                      onDeleteProject(project.id)
                    }
                  }}
                  className="text-red-500 hover:text-red-700 font-semibold"
                  title="Видалити проєкт"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => onSelectProject(project)}
                className="w-full mt-3 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition text-sm"
              >
                Відкрити →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
