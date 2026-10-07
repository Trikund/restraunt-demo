import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: ReactNode;
  error?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, leftIcon, error, type = 'text', className = '', inputClassName = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    
    const baseInputStyle = "w-full bg-white/5 border rounded-xl py-3 px-4 text-foreground placeholder-muted/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:bg-white/10";
    const borderStyle = error 
      ? "border-status-error focus:border-status-error focus:ring-status-error/30" 
      : "border-glass-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/30";
      
    const paddingLeft = leftIcon ? "pl-11" : "pl-4";
    const paddingRight = isPassword ? "pr-12" : "pr-4";

    return (
      <div className={`w-full flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label className="text-sm font-medium text-slate-300 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-aurora-cyan transition-colors">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={`${baseInputStyle} ${borderStyle} ${paddingLeft} ${paddingRight} ${inputClassName}`}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors p-1"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        
        {error && (
          <p className="text-xs text-status-error ml-1 mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
