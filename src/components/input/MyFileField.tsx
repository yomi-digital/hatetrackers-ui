import { PropsWithChildren } from "react";
import PictureImg from "../../assets/images/icons/img.svg";
interface MyFileFieldProps {
  className?: string;
  inputClassName?: string;
  value?: File;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  id?: string;
  onChange?: (value: File) => void;
  onIconClick?: () => void;
}

function MyFileField({
  className,
  inputClassName,
  disabled,
  required,
  value,
  placeholder,
  label,
  error,
  id,
  onChange,
  onIconClick,
}: PropsWithChildren<MyFileFieldProps>) {
  return (
    <div className={`${className}`}>
      <label htmlFor={id}>
        <div className="block text-xs font-bold text-black-600 mb-2 pl-2">
          {label && label}
          {required && <span className="text-red-500">*</span>}
          {error && error.length > 0 && (
            <span className="block text-xs text-red-500 mb-2 pl-2">
              {error}
            </span>
          )}
        </div>
        <div
          className={`${
            inputClassName ? inputClassName : ""
          } w-full flex justify-between 3xl:text-lg bg-black-400 disabled:opacity-25 disabled:cursor-not-allowed rounded-md px-4 py-3 text-black-500`}
        >
          {value ? (
            <span className="text-white">{value.name}</span>
          ) : (
            <span>{placeholder}</span>
          )}

          <img
            className={`${onIconClick ? "cursor-pointer" : ""}`}
            src={PictureImg}
            onClick={() => {
              if (onIconClick) onIconClick();
            }}
          />
        </div>
      </label>
      <input
        id={id}
        type="file"
        disabled={disabled}
        className="hidden"
        onChange={(e) => {
          console.log(e.target.files);
          if (onChange && e.target.files && e.target.files.length > 0) {
            onChange(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}

export default MyFileField;
