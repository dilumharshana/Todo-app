import { useState, useEffect } from 'react';
import { Loader2, ListTodo, Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import TodoForm from './components/todoForm/TodoForm';
import TodoItem from './components/TodoItem/TodoItem';
import Modal from './components/modal/Modal'; // The modal we discussed
import { todoService } from './services/todoServices';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // get all todos 
  useEffect(() => {
    fetchTodos();
  }, []);

  // fetch todos from back end 
  const fetchTodos = async () => {
    try {
      const { data } = await todoService.getAll();
      setTodos(data);
    } catch (err) {
      toast.error("Couldn't sync with the server. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // create new todo and update existing todo
  const handleSaveTodo = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingTodo) {
        const { data } = await todoService.update(editingTodo._id, formData);
        setTodos(prev => prev.map(t => t._id === data._id ? data : t));
      } else {
        const { data } = await todoService.create(formData);
        setTodos(prev => [data, ...prev]);
      }
      closeModal();
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  // change task isDone status 
  const handleToggle = async (id) => {
    const originalTodos = [...todos];
    setTodos(todos.map(t => t._id === id ? { ...t, isDone: !t.isDone } : t));

    try {
      await todoService.toggleDone(id);
    } catch (err) {
      setTodos(originalTodos);
      toast.error("Failed to update status.");
    }
  };

  // delete todo 
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    
    try {
      await todoService.delete(id);
      setTodos(prev => prev.filter(t => t._id !== id));
      toast.success("Task removed");
    } catch (err) {
      toast.error("Could not delete task.");
    }
  };

  const openCreateModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 selection:bg-emerald-100">
      <Toaster position="top-right" />
      
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
              <ListTodo className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none">MY TASKS</h1>
              <p className="text-sm text-gray-500 mt-1 font-medium">{todos.length} items total</p>
            </div>
          </div>

          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-emerald-100 hover:shadow-emerald-200 active:scale-95"
          >
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </header>

        {/* List Section */}
        <main>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="animate-spin mb-3 text-emerald-500" size={40} />
              <p className="font-medium">Loading your workflow...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ListTodo className="text-gray-300" size={32} />
              </div>
              <p className="text-gray-500 font-medium">Your task list is empty</p>
              <button onClick={openCreateModal} className="text-emerald-600 font-bold mt-2 hover:underline">
                Create your first task
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-50">
                {todos.map(todo => (
                  <TodoItem 
                    key={todo._id} 
                    todo={todo} 
                    onToggle={handleToggle} 
                    onDelete={handleDelete}
                    onEdit={openEditModal}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modern Modal for the Form */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingTodo ? 'Update Task' : 'New Task'}
      >
        <TodoForm 
          onSubmit={handleSaveTodo} 
          onCancel={closeModal}
          initialData={editingTodo} 
          isLoading={isSubmitting} 
        />
      </Modal>
    </div>
  );
};

export default App;