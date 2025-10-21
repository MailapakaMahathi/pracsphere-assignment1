'use client';

interface TaskFilterProps {
  currentFilter: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export default function TaskFilter({ currentFilter, onFilterChange, taskCounts }: TaskFilterProps) {
  const filters = [
    { key: 'all' as const, label: '📋 All Tasks', count: taskCounts.all },
    { key: 'pending' as const, label: '⏳ Pending', count: taskCounts.pending },
    { key: 'completed' as const, label: '✅ Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex gap-3 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentFilter === filter.key
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
}