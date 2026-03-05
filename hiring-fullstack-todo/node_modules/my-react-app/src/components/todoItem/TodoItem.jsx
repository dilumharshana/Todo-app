import { CheckCircle2, Circle, Trash2, Edit3, Calendar, Clock } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const { _id, title, description, isDone, createdAt } = todo;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div 
      className={`group relative flex items-center justify-between p-5 transition-all duration-500 ease-in-out border-b border-gray-100 last:border-0
      ${isDone 
        ? 'bg-emerald-50/40' 
        : 'bg-rose-50/30 hover:bg-rose-50/50'
      }`}
    >
      {/* Left Accent Border for Status */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ${isDone ? 'bg-emerald-500' : 'bg-rose-400'}`} />

      <div className="flex items-start gap-4 flex-1 min-w-0 ml-2">
        {/* Toggle Button with Pop Animation */}
        <button 
          onClick={() => onToggle(_id)}
          className={`mt-1 transition-all duration-300 transform active:scale-125 flex-shrink-0
          ${isDone ? 'text-emerald-600' : 'text-rose-400 hover:text-rose-500'}`}
        >
          {isDone ? (
            <CheckCircle2 size={24} className="animate-in zoom-in duration-300 fill-emerald-100/50" />
          ) : (
            <Circle size={24} strokeWidth={1.5} className="hover:rotate-12 transition-transform" />
          )}
        </button>

        {/* Content Section */}
        <div className="flex flex-col min-w-0 pr-4">
          <div className="flex items-center gap-2">
            <h3 className={`font-bold text-[16px] leading-tight transition-all duration-500 truncate
              ${isDone ? 'line-through text-gray-400' : 'text-rose-900'}`}>
              {title}
            </h3>
            
            <span className={`text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded-full transition-colors duration-500
              ${isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {isDone ? 'Completed' : 'Pending'}
            </span>
          </div>

          {description && (
            <p className={`text-sm mt-1 line-clamp-2 transition-all duration-500
              ${isDone ? 'text-gray-400/70' : 'text-rose-800/60'}`}>
              {description}
            </p>
          )}

          {/* Timestamp */}
          <div className={`flex items-center gap-1.5 mt-2 text-[11px] font-bold tracking-tight
            ${isDone ? 'text-emerald-400' : 'text-rose-400'}`}>
            <Clock size={12} />
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button 
          onClick={() => onEdit(todo)} 
          disabled={isDone}
          className={`p-2 rounded-xl transition-all
            ${isDone 
              ? 'text-gray-200 cursor-not-allowed' 
              : 'text-rose-400 hover:text-emerald-600 hover:bg-white shadow-sm'}`}
        >
          <Edit3 size={18} />
        </button>
        <button 
          onClick={() => onDelete(_id)} 
          className="p-2 text-rose-400 hover:text-red-600 hover:bg-white shadow-sm rounded-xl transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;