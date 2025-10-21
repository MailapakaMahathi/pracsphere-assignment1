'use client';

import { useState } from 'react';
import { Input, Button, Card } from '@repo/ui';

interface TaskFormProps {
  onSubmit: (taskData: {
    title: string;
    description: string;
    dueDate: string;
  }) => void;
  onCancel: () => void;
}

export default function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Task title is required!');
      return;
    }
    onSubmit(formData);
    setFormData({ title: '', description: '', dueDate: '' });
  };

  return (
    <Card className="mb-6 bg-blue-50 border-2 border-blue-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        ➕ Add New Task
      </h3>
      <form onSubmit={handleSubmit}>
        <Input
          label="Task Title *"
          type="text"
          placeholder="e.g., File GSTR-3B return"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add details about this task..."
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />

        <div className="flex gap-3">
          <Button type="submit" variant="primary">
            Add Task
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}