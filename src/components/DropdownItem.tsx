import RightArrowImg from "../assets/images/icons/right_arrow.svg";
import { useBreakpoint } from "../hooks/UseBreakpoint";
interface DropdownItemProps {
  title: string;
  description: string;
  isOpen: boolean;
  className?: string;
  onButtonClick: () => void;
}

function DropdownItem({
  title,
  description,
  className,
  isOpen,
  onButtonClick,
}: DropdownItemProps) {
  // const [isHover, setIsHover] = useState(false);
  const { isSm } = useBreakpoint("sm");

  return (
    <div className={`relative w-full ${className}`}>
      <button
        onClick={onButtonClick}
        className="bg-white rounded-2xl w-full px-3 md:px-6 py-4 md:py-7"
      >
        <div
          className={`relative flex items-center text-left justify-between cursor-pointer`}
        >
          <h3 className="font-semibold text-lg md:text-xl">{title}</h3>
          {isSm ? (
            <div
              className={`transition-transform shadow-[0_5px_16px_0_#080F340F] w-10 h-10 rounded-full flex justify-center items-center ${
                isOpen ? "rotate-90" : ""
              }`}
            >
              <img className="w-4 h-4" src={RightArrowImg} />
            </div>
          ) : (
            <div
              className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
            >
              <img className="w-4 h-4 min-w-4 min-h-4" src={RightArrowImg} />
            </div>
          )}
        </div>
      </button>
      <div
        className={`relative w-full bg-white rounded-2xl px-6 py-4 transition-all ${
          isOpen ? "h-48 overflow-auto mt-2" : "h-0 !py-0 overflow-hidden"
        }`}
      >
        <p>{description}</p>
      </div>
    </div>
  );
}

export default DropdownItem;
