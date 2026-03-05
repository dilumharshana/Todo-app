import React, { memo } from 'react';
import { ListTodo, Loader2 } from 'lucide-react';
import TodoItem from '../TodoItem/TodoItem';
import { useTodo } from '../../customHooks/useTodo';

/** 
 ** Sub-component for the Loading State
 */
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-gray-400">
    <Loader2 className="animate-spin mb-4 text-emerald-500/80" size={48} />
    <p className="font-semibold tracking-tight text-gray-500">Syncing your workflow...</p>
  </div>
);

/** 
 ** Sub-component for the Empty State
 */
const EmptyState = ({ onAction }) => (
  <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-sm">
    <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
      <ListTodo className="text-emerald-300" size={36} />
    </div>
    <h3 className="text-gray-900 font-bold text-lg">No tasks yet</h3>
    <p className="text-gray-500 mt-1">Ready to start something new?</p>
    <button
      onClick={onAction}
      className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-100"
    >
      Create your first task
    </button>
  </div>
);

/** 
 ** Main Container
 */
export const TodoListContainer = memo(({
  openEditModal,
  openCreateModal // Ensure this is passed in as a prop
}) => {

  const { todos, isLoading, toggleTodo, deleteTodo } = useTodo();

  // 1. Loading State Check
  if (isLoading) return <LoadingState />;

  // 2. Empty State Check
  if (todos.length === 0) return <EmptyState onAction={openCreateModal} />;

  // 3. Render List
  return (
    <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={openEditModal}
            />
          ))}
        </div>
      </div>
    </main>
  );
});