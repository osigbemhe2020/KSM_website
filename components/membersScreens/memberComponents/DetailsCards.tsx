// DetailsCards.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import useResponsive from '@/hooks/useResponsive';

// Base card wrapper (handles sizing variants)
interface CardProps {
  children: ReactNode;
  variant?: 'normal' | 'big';
  className?: string;
}

export const Card = ({ children, variant = 'normal', className = '' }: CardProps) => {
  const dimensions = variant === 'normal'
    ? 'min-h-[248px] w-full lg:w-[512px]'
    : 'min-h-[273px] w-full lg:w-[680px]';

  return (
    <div className={`${dimensions} border-2 border-[#EAEAEA] mb-6 rounded-lg p-[24px] flex flex-col gap-[32px] ${className}`}>
      {children}
    </div>
  );
};

// Card Header (with optional icon)
interface CardHeaderProps {
  title: string;
  icon?: ReactNode;
}

export const CardHeader = ({ title, icon }: CardHeaderProps) => {
  return (
    <div className="flex items-center gap-[8px]">
      {icon && <div className="w-6 h-6 flex items-center justify-center">{icon}</div>}
      <h2 className="text-[20px]/[1.2] text-black">{title}</h2>
    </div>
  );
};

// Reusable content components
interface ItemProps {
  label: string;
  value: string;
  hasBg?: boolean;
}

export const Item = ({ label, value }: ItemProps) => {
  return (
    <div className="flex flex-col gap-[4px] mb-[24px]">
      <p className="text-[13px]/[1.2] text-black/80">{label}</p>
      <p className="text-[16px]/[1.2] text-black">{value}</p>
    </div>
  );
};

export const LineItem = ({ label, value, hasBg = false }: ItemProps) => {
  return (
    <div className="flex justify-between items-center h-[40px]">
      <span className="text-[13px]/[1.2] text-black/80 text-left">{label}</span>
      <span className={`text-[16px]/[1.2]  text-black font-medium text-left ${hasBg ? 'bg-green-100 text-green-600 px-[12px] py-[8px]' : ''}`}>{value}</span>
    </div>
  );
};

export const GridLayout = ({ children }: { children: ReactNode }) => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className={`grid gap-[16px] ${(isMobile || isTablet) ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {children}
    </div>
  );
};

export const StackLayout = ({ children, spacing = 'gap-[12px]' }: { children: ReactNode; spacing?: string }) => {
  return <div className={`flex flex-col ${spacing}`}>{children}</div>;
};

// Reusable Input component
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  error?: string;
  touched?: boolean;
  className?: string;
  label?: string;
}

export const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  error,
  touched,
  className = '',
  label
}: InputProps) => {
  const defaultClassName = 'w-full bg-[#FFF8DC] py-2 px-4 text-sm placeholder:text-[#000] border border-gray-400 focus:border-[#000]';
  const errorClassName = error && touched ? 'border-red-500 focus:border-red-500' : '';

  return (
    <div>
      {label && (
        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          // Handle both Formik (event) and normal React (value) onChange patterns
          if (typeof onChange === 'function') {
            if (e && typeof e === 'object' && e.target) {
              // Formik pattern - pass the event
              onChange(e);
            } else if (typeof e === 'string') {
              // Normal React pattern - pass the value
              onChange(e);
            } else {
              // Fallback - extract value from event
              onChange((e as React.ChangeEvent<HTMLInputElement>).target.value);
            }
          }
        }}
        onBlur={onBlur}
        className={`${defaultClassName} ${errorClassName} ${className}`}
      />
      {error && touched && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};



// Reusable Button component
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  isBorder?: boolean;
  href?: string;
}

export const Button = ({
  type = 'button',
  children,
  onClick,
  className = '',
  icon,
  isBorder = false,
  disabled = false,
  href
}: ButtonProps) => {
  const baseClasses = `bg-forest text-white py-3 ${isBorder ? 'border-2 border-white' : ''} flex items-center justify-center gap-2 text-sm font-medium rounded-sm hover:opacity-90 transition-opacity disabled:opacity-60`;

  // We only add default layout classes if they are not overridden in className
  const widthClass = className.includes('w-') || className.includes('inline-flex') || className.includes('inline-block') ? '' : 'w-full';
  const marginClass = className.includes('mt-') || className.includes('my-') || className.includes('m-') ? '' : 'mt-4';

  const combinedClasses = `${baseClasses} ${widthClass} ${marginClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {icon && icon}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {icon && icon}
      {children}
    </button>
  );
};

// Reusable Toggle component
interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle = ({ label, description, checked, onChange }: ToggleProps) => {
  return (
    <div className="flex items-center justify-between my-3 w-[300px]">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        {description && <p className="text-sm">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full relative transition-colors ${checked ? "bg-forest" : "bg-gray-300"
          }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "left-[26px]" : "left-0.5"
            }`}
        />
      </button>
    </div>
  );
};