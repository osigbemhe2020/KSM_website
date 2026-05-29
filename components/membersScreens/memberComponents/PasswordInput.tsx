"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./DetailsCards";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  touched?: boolean;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  error,
  touched,
  name,
  onBlur
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pr-12"
        error={error}
        touched={touched}
        name={name}
        onBlur={onBlur}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-9 text-gray-500 hover:text-gray-700 transition-colors"
      >
        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </div>
  );
};
