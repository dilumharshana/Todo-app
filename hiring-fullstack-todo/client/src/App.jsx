import { useState, useEffect } from 'react';
import { Loader2, LayoutList } from 'lucide-react';
import TodoForm from './components/todoForm/TodoForm';
import TodoItem from './components/TodoItem/TodoItem';
import { todoService } from './services/todoServices';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Initial Fetch
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await todoService.getAll();
      setTodos(data);
    } catch (err) {
      alert("Failed to load tasks. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Create or Update Logic
  const handleSaveTodo = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingTodo) {
        const { data } = await todoService.update(editingTodo._id, formData);
        setTodos(todos.map(t => t._id === data._id ? data : t));
        setEditingTodo(null);
      } else {
        const { data } = await todoService.create(formData);
        setTodos([data, ...todos]); // Add new one to top
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Toggle Done (Optimistic UI)
  const handleToggle = async (id) => {
    // Senior move: Update UI immediately, then sync with DB
    const originalTodos = [...todos];
    setTodos(todos.map(t => t._id === id ? { ...t, isDone: !t.isDone } : t));

    try {
      await todoService.toggleDone(id);
    } catch (err) {
      setTodos(originalTodos); // Rollback on error
    }
  };

  // 4. Delete Logic
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await todoService.delete(id);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: Form Section */}
        <div className="md:col-span-5">
          <div className="sticky top-8">
            <TodoForm 
              onSubmit={handleSaveTodo} 
              initialData={editingTodo} 
              isLoading={isSubmitting} 
            />
          </div>
        </div>

        {/* Right Side: List Section */}
        <div className="md:col-span-7">
          <header className="flex items-center gap-2 mb-6">
            <LayoutList className="text-blue-600" size={28} />
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">MY TASKS</h1>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">
              {todos.length}
            </span>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p>Fetching your tasks...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">No tasks found. Start by adding one!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {todos.map(todo => (
                <TodoItem 
                  key={todo._id} 
                  todo={todo} 
                  onToggle={handleToggle} 
                  onDelete={handleDelete}
                  onEdit={(t) => {
                    setEditingTodo(t);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;