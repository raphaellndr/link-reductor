interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  type?: string;
  maxLength?: number;
  helperText?: string;
}

export function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  maxLength,
  helperText,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed"
        disabled={disabled}
      />
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}
