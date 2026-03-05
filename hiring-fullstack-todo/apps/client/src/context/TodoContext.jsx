import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/todoServices';
import toast from 'react-hot-toast';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await todoService.getAll();
      setTodos(data);
    } catch (err) {
      toast.error("Sync failed. Check your server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const saveTodo = async (formData, editingId = null) => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        const { data } = await todoService.update(editingId, formData);
        setTodos(prev => prev.map(t => t._id === data._id ? data : t));
        toast.success("Task updated");
      } else {
        const { data } = await todoService.create(formData);
        setTodos(prev => [data, ...prev]);
        toast.success("Task created");
      }
      return true; // Success
    } catch (err) {
      toast.error("Could not save task.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTodo = async (id) => {
    const original = [...todos];

    // updating ui real time 
    setTodos(prev => prev.map(t => t._id === id ? { ...t, isDone: !t.isDone } : t));
    
    try {
      await todoService.toggleDone(id);
    } catch (err) {

    // if faild to update status then set ui to original state
      setTodos(original);
      toast.error("Failed to toggle status.");
    }
  };

  const deleteTodo = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await todoService.delete(id);
      setTodos(prev => prev.filter(t => t._id !== id));
      toast.success("Task removed");
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  return (
    <TodoContext.Provider value={{ 
      todos, isLoading, isSubmitting, 
      saveTodo, toggleTodo, deleteTodo 
    }}>
      {children}
    </TodoContext.Provider>
  );
};
