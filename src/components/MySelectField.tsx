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
        <label className="block text-xs font-bold text-black-500 mb-2 pl-2">
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
            `bg-black-300 border-black-400 rounded-md px-4 py-3 text-white`,
          placeholder: () => `text-black-400`,
          dropdownIndicator: () => `text-black-400`,
          menu: () => `bg-black-300 mt-2 rounded-md`,
          option: (state) =>
            `${state.isSelected ? "bg-black-400" : ""} px-4 py-3`,
        }}
      />
    </div>
  );
};

export default MySelectField;
