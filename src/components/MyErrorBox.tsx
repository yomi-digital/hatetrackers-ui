import MyButton from "./buttons/MyButton";

interface MyErrorBoxProps {
  label: string;
  buttonLabel?: string;
  rootClassName?: string;
  textClassName?: string;
  buttonClassName?: string;
  onButtonClick: () => void;
}

function MyErrorBox({
  label,
  buttonLabel = "Try again",
  rootClassName,
  textClassName,
  buttonClassName,
  onButtonClick,
}: MyErrorBoxProps) {
  return (
    <div className={`block text-center ${rootClassName}`}>
      <p className={`font-medium text-white text-lg ${textClassName}`}>
        {label}
      </p>
      <MyButton onClick={onButtonClick} className={`mt-3 ${buttonClassName}`}>
        {buttonLabel}
      </MyButton>
    </div>
  );
}

export default MyErrorBox;
