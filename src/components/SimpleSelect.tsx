import * as React from 'react';

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;  // Add this
  className?: string;          // Add this
};

export const Select = ({ value, onChange, children, style, className }: SelectProps) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      style={style}
      className={className}
    >
      {children}
    </select>
  );
};

export const SelectOption: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};