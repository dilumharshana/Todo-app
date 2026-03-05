import React, { memo } from 'react';
import { ListTodo, Plus } from 'lucide-react';
import { useTodo } from '../../customHooks/useTodo';

export const TodoAppHeader = memo(({ onAddClick }) => {
  
  const { todos } = useTodo();

  return (
    <header className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
          <ListTodo className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none">
            MY TASKS
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            {todos?.length} {todos?.length === 1 ? 'item' : 'items'} total
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddClick}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-emerald-100 hover:shadow-emerald-200 active:scale-95"
      >
        <Plus size={20} />
        <span>New Task</span>
      </button>
    </header>
  );
});