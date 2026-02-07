import { useState, useEffect } from 'react'
import { Calendar, Tag, AlertCircle } from 'lucide-react'

export default function TaskForm({ 
  onAddTask, 
  onUpdateTask, 
  editingTask, 
  projects,
  onProjectSelect 
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
    tags: [],
    projectId: null,
  })

  useEffect(() => {
    if (editingTask) {
      const date = editingTask.dueDate ? editingTask.dueDate.split('T')[0] : ''
      const time = editingTask.dueDate ? editingTask.dueDate.split('T')[1]?.slice(0, 5) : ''
      setFormData({
        name: editingTask.name,
        description: editingTask.description || '',
        dueDate: date,
        dueTime: time || '',
        priority: editingTask.priority,
        tags: editingTask.tags || [],
        projectId: editingTask.projectId || null,
      })
    } else {
      setFormData({
        name: '',
        description: '',
        dueDate: '',
        dueTime: '',
        priority: 'medium',
        tags: [],
        projectId: null,
      })
    }
  }, [editingTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      alert('Будь ласка, введіть назву справи')
      return
    }

    let dueDateTime = null
    if (formData.dueDate) {
      dueDateTime = `${formData.dueDate}T${formData.dueTime || '09:00'}`
    }

    const taskData = {
      name: formData.name,
      description: formData.description,
      dueDate: dueDateTime,
      priority: formData.priority,
      tags: formData.tags,
      projectId: formData.projectId,
    }

    if (editingTask) {
      onUpdateTask(editingTask.id, taskData)
    } else {
      onAddTask(taskData)
    }

    setFormData({
      name: '',
      description: '',
      dueDate: '',
      dueTime: '',
      priority: 'medium',
      tags: [],
      projectId: null,
    })
  }

  const handleTagInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const tagInput = e.target.value.trim()
      if (tagInput && !formData.tags.includes(tagInput)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput],
        })
        e.target.value = ''
      }
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {editingTask ? '✏️ Редагування справи' : '➕ Нова справа'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Назва справи *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введіть назву справи"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Опис справи
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Введіть опис справи"
            rows="3"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline mr-2 w-4 h-4" />
              Дата виконання
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Час виконання
            </label>
            <input
              type="time"
              value={formData.dueTime}
              onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <AlertCircle className="inline mr-2 w-4 h-4" />
            Пріоритет
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">🟢 Низький</option>
            <option value="medium">🟡 Середній</option>
            <option value="high">🔴 Високий</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="inline mr-2 w-4 h-4" />
            Теги (введіть та натисніть Enter)
          </label>
          <input
            type="text"
            onKeyPress={handleTagInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Введіть тег та натисніть Enter"
          />
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="tag bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-blue-700 hover:text-blue-900 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Project Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📁 Додати до проєкту
          </label>
          <select
            value={formData.projectId || ''}
            onChange={(e) => setFormData({ ...formData, projectId: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Без проєкту</option>
            {Array.isArray(projects) && projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {editingTask ? 'Оновити справу' : 'Додати справу'}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: '',
                  description: '',
                  dueDate: '',
                  dueTime: '',
                  priority: 'medium',
                  tags: [],
                  projectId: null,
                })
              }}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
            >
              Скасувати
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
