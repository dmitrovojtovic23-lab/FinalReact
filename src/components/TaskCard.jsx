import { format } from 'date-fns'
import { uk } from 'date-fns/locale'

export default function TaskCard({
  task,
  onDelete,
  onEdit,
  onAddToProject,
  projects,
}) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50'
      case 'medium':
        return 'border-yellow-500 bg-yellow-50'
      case 'low':
        return 'border-green-500 bg-green-50'
      default:
        return 'border-gray-300'
    }
  }

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴 Високий'
      case 'medium':
        return '🟡 Середній'
      case 'low':
        return '🟢 Низький'
      default:
        return priority
    }
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return 'Без дати'
    try {
      const date = new Date(dateString)
      return format(date, 'd MMM yyyy, HH:mm', { locale: uk })
    } catch {
      return 'Невірна дата'
    }
  }

  const isOverdue = (dateString) => {
    if (!dateString) return false
    const dueDate = new Date(dateString)
    return dueDate < new Date()
  }

  return (
    <div className={`task-card ${getPriorityColor(task.priority)} border-2`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-800">{task.name}</h4>
          {task.description && (
            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-500 hover:text-blue-700 font-semibold text-sm"
            title="Редагувати"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 font-semibold text-sm"
            title="Видалити"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Due Date */}
      <div className="text-sm text-gray-600 mb-3">
        <span className={`${isOverdue(task.dueDate) ? 'text-red-600 font-semibold' : ''}`}>
          📅 {formatDueDate(task.dueDate)}
        </span>
        {isOverdue(task.dueDate) && <span className="ml-2 text-red-600">⚠️ ПРОСТРОЧЕНО</span>}
      </div>

      {/* Priority */}
      <div className="text-sm mb-3">
        <span className="font-medium">{getPriorityLabel(task.priority)}</span>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {task.tags.map((tag) => (
            <span key={tag} className="tag bg-indigo-100 text-indigo-700 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Project */}
      {task.projectId && (
        <div className="text-sm text-gray-600 mb-3">
          📁 {projects.find(p => p.id === task.projectId)?.name || 'Невідомий проєкт'}
        </div>
      )}

      {/* Add to Project */}
      {!task.projectId && projects.length > 0 && (
        <div className="flex gap-2 mt-3">
          <select
            onChange={(e) => {
              if (e.target.value) {
                onAddToProject(task.id, e.target.value)
                e.target.value = ''
              }
            }}
            className="text-sm px-2 py-1 border border-gray-300 rounded"
            defaultValue=""
          >
            <option value="">Додати до проєкту...</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
