import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div
      className={`rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`p-8 ${className}`}>
      {children}
    </div>
  );
}; 