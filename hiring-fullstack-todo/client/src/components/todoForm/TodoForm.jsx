import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { todoSchema } from '../../utils/validations/validations';
import { TextInput } from '../textInput/TextInput';
import { Button } from '../button/Button';

const TodoForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  // Initialize Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: { title: '', description: '' }
  });

  // Sync form switch to "Edit Mode"
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description || '',
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);

    // Clear form after adding new task
    if (!initialData) reset(); 
  };

  return (
    <form 
      onSubmit={handleSubmit(handleFormSubmit)} 
      className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">
        {initialData ? 'Edit Task' : 'Create Task'}
      </h2>
      
      <TextInput 
        label="Title"
        placeholder="What needs to be done?"
        error={errors.title?.message}
        {...register('title')} 
      />

      <TextInput 
        label="Description"
        placeholder="Add details (optional)"
        error={errors.description?.message}
        {...register('description')}
      />

      <div className="flex gap-2">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Save Changes' : 'Add Task'}
        </Button>
        
        {initialData && (
          <Button variant="secondary" onClick={() => reset({ title: '', description: '' })}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;