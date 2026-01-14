
import React from 'react';

interface CalculatorButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-16 sm:h-20 text-2xl sm:text-3xl rounded-full focus:outline-none transition-colors duration-200 ${className} hover:opacity-90 active:opacity-75`}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
