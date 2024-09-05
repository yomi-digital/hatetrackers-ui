import React from "react";
import Select from "react-select";

interface MySelectFieldProps {
  label?: string;
  options: { label: string; value: string }[];
  value?: string;
  required?: boolean;
  onChange: (value: string) => void;
  className?: string;
}

const MySelectField: React.FC<MySelectFieldProps> = ({
  label,
  options,
  value,
  required,
  onChange,
  className,
}) => {
  return (
    <div className={`my-select-field-container ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-black-600 mb-2 pl-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select
        unstyled
        value={
          value !== undefined && value !== ""
            ? options.find((option) => option.value === value)
            : undefined
        }
        options={options}
        onChange={(selectedOption) => onChange(selectedOption?.value || "")}
        classNames={{
          control: () =>
            `bg-black-400 border-black-500 rounded-md px-4 py-3 text-white`,
          placeholder: () => `text-black-500`,
          dropdownIndicator: () => `text-black-500`,
          menu: () => `bg-black-400 mt-2 rounded-md`,
          option: (state) =>
            `${state.isSelected ? "bg-black-500" : ""} px-4 py-3`,
        }}
      />
    </div>
  );
};

export default MySelectField;
