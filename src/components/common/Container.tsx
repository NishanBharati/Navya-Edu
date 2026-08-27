import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  id,
  size = 'default'
}) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-350',
    wide: 'max-w-380'
  };

  return (
    <div
      id={id}
      className={`w-full mx-auto px-4 sm:px-6 lg:px-6 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
};
