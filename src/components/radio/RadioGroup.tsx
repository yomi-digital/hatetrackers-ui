import RadioButton from "./RadioButton";

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  direction?: "horizontal" | "vertical";
  label?: string;
  required?: boolean;
  className?: string;
}

function RadioGroup({
  options,
  value,
  required,
  onChange,
  direction = "horizontal",
  label,
  className = "",
}: RadioGroupProps) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-black-500 mb-2 pl-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`flex ${
          direction === "vertical" ? "flex-col space-y-4" : "space-x-6"
        } ${className}`}
      >
        {options.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
