import { PropsWithChildren } from "react";

interface MyInputFieldProps {
  className?: string;
  inputClassName?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  id?: string;
  onChange: (value: string) => void;
}

function MyInputField({
  className,
  inputClassName,
  disabled,
  required,
  placeholder,
  label,
  error,
  id,
  onChange,
}: PropsWithChildren<MyInputFieldProps>) {
  return (
    <div className={`${className}`}>
      <div className="flex">
        {label && (
          <label
            className="block text-xs font-bold text-black-600 mb-2 pl-2"
            htmlFor={id}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {error && error.length > 0 && (
          <span className="block text-xs text-red-500 mb-2 pl-2">{error}</span>
        )}
      </div>
      <input
        id={id}
        placeholder={placeholder}
        type="text"
        disabled={disabled}
        className={`${inputClassName ? inputClassName : ""} w-full`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default MyInputField;
