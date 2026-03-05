import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { todoSchema } from '../../utils/validations/validations';
import { TextInput } from '../textInput/TextInput';
import { Button } from '../button/Button';
import toast from 'react-hot-toast'; // Assuming you use react-hot-toast or similar

const TodoForm = ({ onSubmit, onCancel, initialData = null, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: { title: '', description: '' }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description || '',
      });
    } else {
      reset({ title: '', description: '' });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      toast.success(initialData ? 'Task updated successfully' : 'Task created successfully');
      if (!initialData) reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleCancel = () => {
    // Explicitly reset to empty or initial without triggering validation
    reset({ title: '', description: '' }, { keepDefaultValues: false });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <TextInput 
        label="Task Title"
        placeholder="e.g. Design system update"
        error={errors.title?.message}
        {...register('title')} 
      />

      <TextInput 
        label="Description"
        placeholder="Briefly describe the objective..."
        error={errors.description?.message}
        {...register('description')}
      />

      <div className="flex items-center gap-3 pt-2">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={handleCancel}
          className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 border-none"
        >
          Cancel
        </Button>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200 transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            initialData ? 'Update Task' : 'Create Task'
          )}
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;