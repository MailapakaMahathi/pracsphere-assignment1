'use client';

import { Card, Button } from '@repo/ui';
import { Calendar, CheckCircle, Circle, Trash2 } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string | null;
  status: 'pending' | 'completed';
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onToggleStatus: (taskId: string, newStatus: 'pending' | 'completed') => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, onToggleStatus, onDelete }: TaskCardProps) {
  // Check if task is overdue
  const isOverdue = task.dueDate && task.status === 'pending' 
    ? new Date(task.dueDate) < new Date() 
    : false;

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card 
      className={`hover:shadow-lg transition-shadow ${
        isOverdue ? 'border-l-4 border-red-500 bg-red-50' : ''
      } ${task.status === 'completed' ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Task Title */}
          <div className="flex items-start gap-3 mb-2">
            <button
              onClick={() => onToggleStatus(
                task._id, 
                task.status === 'pending' ? 'completed' : 'pending'
              )}
              className="mt-1"
            >
              {task.status === 'completed' ? (
                <CheckCircle className="text-green-600" size={24} />
              ) : (
                <Circle className="text-gray-400 hover:text-blue-600" size={24} />
              )}
            </button>
            <div>
              <h3 className={`text-lg font-semibold ${
                task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              {isOverdue && (
                <span className="text-xs text-red-600 font-medium">
                  ⚠️ Overdue
                </span>
              )}
            </div>
          </div>

          {/* Task Description */}
          {task.description && (
            <p className="text-gray-600 mb-3 ml-9">
              {task.description}
            </p>
          )}

          {/* Due Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 ml-9">
            <Calendar size={16} />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete task"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Status Badge */}
      <div className="mt-3 ml-9">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          task.status === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {task.status === 'pending' ? '⏳ Pending' : '✅ Completed'}
        </span>
      </div>
    </Card>
  );
}