import TaskCard from './TaskCard'

export default function TaskList({
  tasks,
  onDeleteTask,
  onEditTask,
  onAddToProject,
  projects,
  editingTaskId,
}) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-gray-500 text-lg">Немає справ для відображення</p>
        <p className="text-gray-400 text-sm mt-2">Додайте першу справу, щоб розпочати</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`${editingTaskId === task.id ? 'ring-2 ring-blue-500' : ''}`}
        >
          <TaskCard
            task={task}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
            onAddToProject={onAddToProject}
            projects={projects}
          />
        </div>
      ))}
    </div>
  )
}
