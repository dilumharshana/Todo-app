import { CheckCircle, Circle, Trash2, Edit3 } from 'lucide-react';
import { Button } from '../button/Button';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const { _id, title, description, isDone } = todo;

  return (
    <div className={`flex items-center justify-between p-4 mb-3 border rounded-xl transition-all duration-300
 ${
      isDone ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-100 shadow-sm hover:shadow-md'
    }`}>
      <div className="flex items-start gap-3 flex-1">
        {/* Toggle Button */}
        <button 
          onClick={() => onToggle(_id)}
          className={`mt-1 transition-colors ${isDone ? 'text-green500' : 'text-gray-400 hover:text-blue-500'}`}
        >
          {isDone ? <CheckCircle size={22} fill="currentColor" className="text-white" /> : <Circle size={22} />}
        </button>

        {/* Text Content */}
        <div className="flex flex-col">
          <h3 className={`font-semibold text-lg leading-tight ${isDone ? 'line-through text-red-500' : 'text-blue-600'}`}>
            {title}
          </h3>
          {description && (
            <p className={`text-sm mt-1 ${isDone ? 'text-gray-300' : 'text-gray-500'}`}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-1 ml-4 ">
        <Button variant="ghost" onClick={() => onEdit(todo)} className="p-2  hover:bg-blue-50">
          <Edit3 size={18} />
        </Button>
        <Button variant="ghost" onClick={() => onDelete(_id)} className="p-2 hover:bg-red-50">
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;