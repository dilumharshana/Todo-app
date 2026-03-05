export const TextInput = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <input 
        className={`px-4 py-2 border rounded-lg focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
        }`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};