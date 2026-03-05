import { CheckCircle2, Circle, Trash2, Edit3 } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const { _id, title, description, isDone } = todo;

  return (
    <div 
      className={`group flex items-center justify-between p-5 transition-all duration-200 
      ${isDone ? 'bg-gray-50/50' : 'bg-white hover:bg-emerald-50/30'}`}
    >
      <div className="flex items-start gap-4 flex-1 min-w-0">

        <button 
          onClick={() => onToggle(_id)}
          className={`mt-0.5 transition-all duration-200 transform active:scale-90 flex-shrink-0
          ${isDone ? 'text-emerald-500' : 'text-gray-300 hover:text-emerald-400'}`}
        >
          {isDone ? (
            <CheckCircle2 size={24} className="fill-emerald-50" />
          ) : (
            <Circle size={24} strokeWidth={1.5} />
          )}
        </button>

        {/* Text Content */}
        <div className="flex flex-col truncate">
          <h3 className={`font-medium text-[16px] leading-snug transition-all duration-300 truncate
            ${isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {title}
          </h3>
          {description && (
            <p className={`text-sm mt-0.5 truncate transition-all duration-300
              ${isDone ? 'text-gray-300' : 'text-gray-500'}`}>
              {description}
            </p>
          )}
        </div>
      </div>


      <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          onClick={() => onEdit(todo)} 
          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          title="Edit Task"
          disabled={isDone} 
        >
          <Edit3 size={18} />
        </button>
        <button 
          onClick={() => onDelete(_id)} 
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete Task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;