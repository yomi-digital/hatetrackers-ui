import { PropsWithChildren } from "react";
import CrossIcon from "../../assets/images/icons/cross.svg";

interface WindowProps {
  onCloseClick?: () => void;
  windowClassName?: string;
  removeStyle?: boolean;
  raiseDepth?: boolean;
}

function Window({
  children,
  windowClassName,
  onCloseClick,
  removeStyle,
  raiseDepth,
}: PropsWithChildren<WindowProps>) {
  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0${
        raiseDepth ? " z-50" : ""
      } flex flex-col justify-center items-center`}
    >
      <div className="absolute top-0 right-0 bottom-0 -z-10 left-0 bg-black flex justify-center items-center">
        <div className="h-3/4 w-3/4 bg-pink/30 rounded-[100%] blur-[200px]" />
      </div>

      <div
        className={`absolute ${
          removeStyle
            ? ""
            : "bg-black/50 p-16 border-[1.5px] border-pink rounded-2xl"
        } ${windowClassName}`}
      >
        {onCloseClick && (
          <button
            className="absolute top-5 right-5 w-9 h-9 transition-colors bg-pink hover:bg-pink-dark active:bg-pink-dark/80 rounded-full"
            onClick={onCloseClick}
          >
            <img className="mx-auto w-2/5 h-2/5" src={CrossIcon} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

export default Window;
