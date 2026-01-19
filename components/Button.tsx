import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "font-sans font-semibold tracking-wide px-8 py-4 transition-all duration-200 ease-in-out flex items-center justify-center rounded-sm uppercase text-xs sm:text-sm";
  
  const variants = {
    primary: "bg-electric-teal text-matte-black hover:bg-teal-white hover:bg-white hover:text-matte-black shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]",
    secondary: "bg-crimson text-white hover:bg-red-700",
    outline: "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/5",
    ghost: "bg-transparent text-electric-teal hover:text-white"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};