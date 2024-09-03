import { PropsWithChildren } from "react";

interface MyButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  buttonStyle?: "primary" | "secondary" | "tertiary";
  buttonFilling?: "solid" | "outline" | "clear";
  size?: "small" | "medium";
}

function MyButton({
  onClick,
  className,
  children,
  disabled,
  buttonStyle = "primary",
  buttonFilling = "solid",
  size = "medium",
}: PropsWithChildren<MyButtonProps>) {
  const btnStyle = stylesMap[buttonStyle][buttonFilling];

  return (
    <button
      disabled={disabled}
      className={`my-button ${size} ${btnStyle} ${className ? className : ""}`}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
}

const stylesMap = {
  primary: {
    solid: "my-button-primary-solid",
    outline: "my-button-primary-outline",
    clear: "my-button-primary-clear",
  },
  secondary: {
    solid: "my-button-secondary-solid",
    outline: "my-button-secondary-outline",
    clear: "my-button-secondary-clear",
  },
  tertiary: {
    solid: "my-button-tertiary-solid",
    outline: "my-button-tertiary-outline",
    clear: "my-button-tertiary-clear",
  },
};

export default MyButton;
