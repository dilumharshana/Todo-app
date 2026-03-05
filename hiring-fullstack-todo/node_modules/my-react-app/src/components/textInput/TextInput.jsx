import { forwardRef } from 'react';

export const TextInput = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full outline-none transition-all focus:ring-27">
      {label && <label className="text-sm font-semibold text-gray-600 ml-1">{label}</label>}
      <input 
        ref={ref}
        className={`px-4 py-2 border rounded-xl outline-none transition-all focus:ring-2 ${
          error 
            ? 'border-red-400 focus:ring-red-100' 
            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
        }`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 ml-1 font-medium">{error}</span>}
    </div>
  );
});
