import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MoreVertical, Clock, User, Tag, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const TaskBoard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: 'Setup Project Repository',
        description: 'Create GitHub repo and setup initial structure',
        priority: 'high',
        assignee: 'You',
        dueDate: '2025-10-28',
        tags: ['setup', 'git']
      },
      {
        id: 2,
        title: 'Design Database Schema',
        description: 'Create ER diagram and define collections',
        priority: 'medium',
        assignee: 'You',
        dueDate: '2025-10-29',
        tags: ['database', 'design']
      }
    ],
    inProgress: [
      {
        id: 3,
        title: 'Build Authentication API',
        description: 'Implement JWT-based authentication',
        priority: 'high',
        assignee: 'You',
        dueDate: '2025-10-27',
        tags: ['backend', 'auth']
      }
    ],
    review: [
      {
        id: 4,
        title: 'Create Login Page',
        description: 'Design and implement login UI',
        priority: 'medium',
        assignee: 'You',
        dueDate: '2025-10-26',
        tags: ['frontend', 'ui']
      }
    ],
    done: [
      {
        id: 5,
        title: 'Project Setup Complete',
        description: 'Initial project structure created',
        priority: 'low',
        assignee: 'You',
        dueDate: '2025-10-25',
        tags: ['setup']
      }
    ]
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskColumn, setNewTaskColumn] = useState('todo');

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-500' },
    { id: 'inProgress', title: 'In Progress', color: 'bg-blue-500' },
    { id: 'review', title: 'Review', color: 'bg-yellow-500' },
    { id: 'done', title: 'Done', color: 'bg-green-500' }
  ];

  const handleDragStart = (task, column) => {
    setDraggedTask(task);
    setDraggedFrom(column);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumn) => {
    if (draggedTask && draggedFrom !== targetColumn) {
      // Remove from source column
      const sourceTasks = tasks[draggedFrom].filter(t => t.id !== draggedTask.id);
      
      // Add to target column
      const targetTasks = [...tasks[targetColumn], draggedTask];

      setTasks({
        ...tasks,
        [draggedFrom]: sourceTasks,
        [targetColumn]: targetTasks
      });

      toast.success(`Task moved to ${columns.find(c => c.id === targetColumn).title}`);
    }

    setDraggedTask(null);
    setDraggedFrom(null);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-green-100 text-green-700 border-green-300'
    };
    return colors[priority];
  };

  const handleAddTask = () => {
    setShowAddTask(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
                <p className="text-sm text-gray-600">E-Commerce Website Project</p>
              </div>
            </div>
            <button
              onClick={handleAddTask}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className="bg-gray-50 rounded-xl p-4"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                  <h3 className="font-bold text-gray-900">{column.title}</h3>
                  <span className="text-sm text-gray-500">({tasks[column.id].length})</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Plus size={18} />
                </button>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {tasks[column.id].map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-move"
                  >
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{task.title}</h4>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    {/* Task Description */}
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>

                    {/* Task Meta */}
                    <div className="space-y-2">
                      {/* Priority */}
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={14} />
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <User size={14} />
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {tasks[column.id].length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No tasks yet
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{tasks.todo.length}</div>
            <div className="text-sm text-gray-600">To Do</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{tasks.inProgress.length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{tasks.review.length}</div>
            <div className="text-sm text-gray-600">Review</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{tasks.done.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;