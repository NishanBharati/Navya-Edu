import React from 'react';

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  hint,
  error,
  className = '',
  children,
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={htmlFor} className="block text-xs font-semibold uppercase tracking-wider text-ink">
            {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
          </label>
        </div>
      )}
      {children}
      {hint && !error && <p className="text-xs text-ink-muted leading-relaxed">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-red-600 flex items-center gap-1" role="alert">
          <span className="inline-block w-1 h-1 rounded-full bg-red-600 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className = '', error, leftIcon, rightIcon, disabled, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="absolute left-3.5 text-ink-muted pointer-events-none flex items-center justify-center shrink-0">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          className={`w-full rounded-xl border bg-white text-sm text-ink placeholder:text-ink-muted/60 transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-paper-alt disabled:text-ink-muted disabled:cursor-not-allowed ${
            leftIcon ? 'pl-10' : 'pl-3.5'
          } ${rightIcon ? 'pr-10' : 'pr-3.5'} py-2.5 ${
            hasError
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100 text-red-900'
              : 'border-input-border hover:border-navy/30 focus:border-navy focus:ring-navy/10'
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3.5 text-ink-muted flex items-center justify-center shrink-0">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', error, disabled, rows = 4, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        rows={rows}
        aria-invalid={hasError}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-paper-alt disabled:text-ink-muted disabled:cursor-not-allowed resize-y ${
          hasError
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100 text-red-900'
            : 'border-input-border hover:border-navy/30 focus:border-navy focus:ring-navy/10'
        } ${className}`}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

export interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string | boolean;
  leftIcon?: React.ReactNode;
}

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className = '', error, leftIcon, disabled, children, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="absolute left-3.5 text-ink-muted pointer-events-none flex items-center justify-center shrink-0">
            {leftIcon}
          </span>
        )}
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          className={`w-full appearance-none rounded-xl border bg-white text-sm text-ink transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-paper-alt disabled:text-ink-muted disabled:cursor-not-allowed ${
            leftIcon ? 'pl-10' : 'pl-3.5'
          } pr-10 py-2.5 cursor-pointer ${
            hasError
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100 text-red-900'
              : 'border-input-border hover:border-navy/30 focus:border-navy focus:ring-navy/10'
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        <span className="absolute right-3.5 pointer-events-none text-ink-muted">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    );
  }
);

SelectInput.displayName = 'SelectInput';
