'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@repo/ui';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import { Plus } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string | null;
  status: 'pending' | 'completed';
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // ✅ Stable fetch function using useCallback
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch tasks only when user is logged in
  useEffect(() => {
    if (session?.user?.email) {
      fetchTasks();
    }
  }, [session?.user?.email, fetchTasks]);

  // ✅ Create a new task
  const handleAddTask = async (taskData: {
    title: string;
    description: string;
    dueDate: string;
  }) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prev) => [newTask, ...prev]);
        setShowForm(false);
      } else {
        alert('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task');
    }
  };

  // ✅ Toggle task status
  const handleToggleStatus = async (
    taskId: string,
    newStatus: 'pending' | 'completed'
  ) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? updatedTask : task))
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // ✅ Delete a task
  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      if (response.ok) {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // ✅ Filtering logic
  const filteredTasks = tasks.filter((task) =>
    filter === 'all' ? true : task.status === filter
  );

  // ✅ Task counts
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {session?.user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600">
          Manage your tasks efficiently and stay organized
        </p>
      </div>

      {/* Add Task Button */}
      {!showForm && (
        <div className="mb-6">
          <Button
            onClick={() => setShowForm(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Task
          </Button>
        </div>
      )}

      {/* Task Form */}
      {showForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Task Filter */}
      <TaskFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        taskCounts={taskCounts}
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredTasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
          </h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all'
              ? 'Create your first task to get started!'
              : `You don't have any ${filter} tasks`}
          </p>
          {!showForm && filter === 'all' && (
            <Button onClick={() => setShowForm(true)} variant="primary">
              Create Your First Task
            </Button>
          )}
        </div>
      )}

      {/* Task List */}
      {!loading && filteredTasks.length > 0 && (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Task Summary */}
      {!loading && tasks.length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            📊 Task Summary
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {taskCounts.all}
              </div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">
                {taskCounts.pending}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {taskCounts.completed}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
