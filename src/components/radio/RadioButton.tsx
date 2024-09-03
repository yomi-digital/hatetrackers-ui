export interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

function RadioButton({ label, value, checked, onChange }: RadioButtonProps) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="radio"
          className="hidden"
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
        />
        <div
          className={`w-4 h-4 border-2 border-black-300 rounded-full ${
            checked ? "bg-white" : "bg-black-200"
          }`}
        />
      </div>
      <span
        className={`ml-2 text-lg font-semibold ${
          checked ? "text-white" : "text-black-400"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default RadioButton;
