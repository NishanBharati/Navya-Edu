import React from 'react';

interface FieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ label, htmlFor, required, hint, error, className = '', children }) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-xs font-semibold text-[#171A1F] uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[11px] text-[#8C939E]">{hint}</p>}
      {error && <p className="mt-1.5 text-[11px] font-medium text-red-600">{error}</p>}
    </div>
  );
};

const inputBase =
  'w-full px-3.5 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-sm text-[#171A1F] placeholder:text-[#8C939E] focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white transition-colors';

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input className={`${inputBase} ${className}`} {...props} />
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea className={`${inputBase} resize-none ${className}`} {...props} />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
  <select className={`${inputBase} ${className}`} {...props}>
    {children}
  </select>
);

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, description }) => (
  <label className="flex items-start gap-3 cursor-pointer select-none">
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`mt-0.5 relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-[#17324D]' : 'bg-[#D8D2C6]'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${
          checked ? 'translate-x-4.5' : 'translate-x-1'
        }`}
        style={{ transform: checked ? 'translateX(18px)' : 'translateX(2px)' }}
      />
    </button>
    <span>
      <span className="block text-sm font-medium text-[#171A1F]">{label}</span>
      {description && <span className="block text-xs text-[#8C939E] mt-0.5">{description}</span>}
    </span>
  </label>
);

interface ListFieldProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}

export const ListField: React.FC<ListFieldProps> = ({ items, onChange, placeholder, addLabel = 'Add item' }) => {
  const updateAt = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };
  const removeAt = (index: number) => onChange(items.filter((_, i) => i !== index));
  const addNew = () => onChange([...items, '']);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <TextInput
            value={item}
            placeholder={placeholder}
            onChange={(e) => updateAt(index, e.target.value)}
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => removeAt(index)}
            aria-label="Remove item"
            className="shrink-0 w-9 h-9 rounded-lg border border-[#D8D2C6] text-[#8C939E] hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center"
          >
            &times;
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addNew}
        className="text-xs font-semibold text-[#356A9A] hover:text-[#17324D] transition-colors"
      >
        + {addLabel}
      </button>
    </div>
  );
};

interface TagsFieldProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export const TagsField: React.FC<TagsFieldProps> = ({ tags, onChange, placeholder = 'Type and press Enter' }) => {
  const [draft, setDraft] = React.useState('');

  const commit = () => {
    const value = draft.trim();
    if (value && !tags.includes(value)) {
      onChange([...tags, value]);
    }
    setDraft('');
  };

  return (
    <div className="rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] focus-within:ring-2 focus-within:ring-[#17324D] focus-within:bg-white px-2.5 py-2">
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1 rounded-md bg-[#17324D]/10 text-[#17324D] text-xs font-medium px-2 py-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((_, i) => i !== index))}
              className="text-[#17324D]/60 hover:text-[#17324D]"
              aria-label={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              commit();
            } else if (e.key === 'Backspace' && !draft && tags.length) {
              onChange(tags.slice(0, -1));
            }
          }}
          onBlur={commit}
          placeholder={tags.length ? '' : placeholder}
          className="flex-1 min-w-[140px] bg-transparent text-sm text-[#171A1F] placeholder:text-[#8C939E] focus:outline-none py-1"
        />
      </div>
    </div>
  );
};
