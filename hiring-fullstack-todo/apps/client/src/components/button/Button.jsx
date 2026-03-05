import { variants } from "../../constants/Constants";

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <button 
      className={`px-4 py-2 rounded-lg font-medium  transition-all duration-200 active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};