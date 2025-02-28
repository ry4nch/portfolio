import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
      disabled:pointer-events-none disabled:opacity-50
      bg-primary text-primary-foreground hover:bg-primary/90
      ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 