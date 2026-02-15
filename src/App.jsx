import { useState, useEffect } from 'react'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import ProjectManager from './components/ProjectManager'
import SearchBar from './components/SearchBar'
import DateFilter from './components/DateFilter'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeTab, setActiveTab] = useState('tasks')
  const [searchFilters, setSearchFilters] = useState({
    query: '',
    searchType: 'name',
    priority: null,
    tags: [],
  })
  const [dateFilter, setDateFilter] = useState({
    type: 'all',
    startDate: null,
    endDate: null,
  })
  const [editingTask, setEditingTask] = useState(null)
  useEffect(() => {
    const savedTasks = localStorage.getItem('todos_tasks')
    const savedProjects = localStorage.getItem('todos_projects')
    if (savedTasks) setTasks(JSON.parse(savedTasks))
    if (savedProjects) setProjects(JSON.parse(savedProjects))
  }, [])
  useEffect(() => {
    localStorage.setItem('todos_tasks', JSON.stringify(tasks))
  }, [tasks])
  useEffect(() => {
    localStorage.setItem('todos_projects', JSON.stringify(projects))
  }, [projects])

  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      ...taskData,
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
    setEditingTask(null)
  }

  const updateTask = (taskId, updatedData) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedData } : task
    ))
    setEditingTask(null)
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const addProject = (projectName) => {
    const newProject = {
      id: uuidv4(),
      name: projectName,
      createdAt: new Date().toISOString(),
    }
    setProjects([...projects, newProject])
  }

  const deleteProject = (projectId) => {
    setProjects(projects.filter(proj => proj.id !== projectId))
    if (selectedProject?.id === projectId) setSelectedProject(null)
  }

  const addTaskToProject = (taskId, projectId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, projectId } : task
    ))
  }

  const getFilteredTasks = () => {
    let filtered = selectedProject 
      ? tasks.filter(t => t.projectId === selectedProject.id)
      : tasks
    if (searchFilters.query) {
      filtered = filtered.filter(task => {
        if (searchFilters.searchType === 'name') {
          return task.name.toLowerCase().includes(searchFilters.query.toLowerCase())
        } else if (searchFilters.searchType === 'description') {
          return task.description.toLowerCase().includes(searchFilters.query.toLowerCase())
        } else if (searchFilters.searchType === 'tag') {
          return task.tags?.some(tag => 
            tag.toLowerCase().includes(searchFilters.query.toLowerCase())
          )
        }
        return true
      })
    }

    if (searchFilters.priority) {
      filtered = filtered.filter(task => task.priority === searchFilters.priority)
    }

    if (searchFilters.tags.length > 0) {
      filtered = filtered.filter(task =>
        searchFilters.tags.some(tag => task.tags?.includes(tag))
      )
    }
    if (dateFilter.type !== 'all') {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      filtered = filtered.filter(task => {
        if (!task.dueDate) return false
        const taskDate = new Date(task.dueDate)
        taskDate.setHours(0, 0, 0, 0)

        if (dateFilter.type === 'day') {
          return taskDate.getTime() === today.getTime()
        } else if (dateFilter.type === 'week') {
          const weekStart = new Date(today)
          weekStart.setDate(today.getDate() - today.getDay())
          const weekEnd = new Date(weekStart)
          weekEnd.setDate(weekStart.getDate() + 6)
          return taskDate >= weekStart && taskDate <= weekEnd
        } else if (dateFilter.type === 'month') {
          return taskDate.getMonth() === today.getMonth() &&
                 taskDate.getFullYear() === today.getFullYear()
        }
        return true
      })
    }

    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="sidebar w-64 p-6 h-screen overflow-y-auto sticky top-0">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 Список справ</h1>
          <div className="space-y-2 mb-8">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === 'tasks'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
               Справи
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === 'projects'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
               Проєкти
            </button>
          </div>
          {activeTab === 'projects' && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Мої проєкти:</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {projects.map(project => (
                  <div
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project)
                      setActiveTab('tasks')
                    }}
                    className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 flex justify-between items-center"
                  >
                    <span className="text-sm font-medium">{project.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {selectedProject ? `📁 ${selectedProject.name}` : '📝 Всі справи'}
            </h2>
            {selectedProject && (
              <button
                onClick={() => setSelectedProject(null)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                ← Назад до всіх справ
              </button>
            )}
          </div>

          {activeTab === 'tasks' ? (
            <>
              <TaskForm 
                onAddTask={addTask}
                onUpdateTask={updateTask}
                editingTask={editingTask}
                projects={projects}
                onProjectSelect={setSelectedProject}
              />
              <div className="mb-6 space-y-4">
                <SearchBar 
                  searchFilters={searchFilters}
                  setSearchFilters={setSearchFilters}
                />
                <DateFilter
                  dateFilter={dateFilter}
                  setDateFilter={setDateFilter}
                />
              </div>
              <TaskList
                tasks={getFilteredTasks()}
                onDeleteTask={deleteTask}
                onEditTask={setEditingTask}
                onAddToProject={addTaskToProject}
                projects={projects}
                editingTaskId={editingTask?.id}
              />
            </>
          ) : (
            <ProjectManager
              projects={projects}
              onAddProject={addProject}
              onDeleteProject={deleteProject}
              onSelectProject={(project) => {
                setSelectedProject(project)
                setActiveTab('tasks')
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
