import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import LogoLongImg from "../assets/images/logo_long.svg";
import { useBreakpoint } from "../hooks/UseBreakpoint";
import MyButton from "./buttons/MyButton";

interface NavbarProps {
  showCreateButton?: boolean;
  className?: string;
  listClassName?: string;
}

function Navbar({
  showCreateButton = false,
  className,
}: // listClassName,
NavbarProps) {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { isXs } = useBreakpoint("xs");

  const trimmedAccount = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-5)}`;
  }, [address]);

  const renderHtml = useMemo(() => {
    if (isXs) {
      return (
        <nav
          className={`h-navbar-desktop w-full z-10 bg-black-100 ${className}`}
        >
          <div className="px-5 flex justify-between items-center h-full w-full">
            <div className="h-3/5 w-1/4 max-w-[330px]">
              <Link to="/">
                <img
                  src={LogoLongImg}
                  alt="Hate Trackers logo"
                  className="h-full max-w-full object-contain"
                />
              </Link>
            </div>

            <div className="flex">
              {showCreateButton && (
                <Link to="/create">
                  <MyButton className="block mr-4">New entry</MyButton>
                </Link>
              )}
              {isConnected && (
                <MyButton
                  buttonStyle="secondary"
                  className="block"
                  onClick={open}
                >
                  {trimmedAccount}
                </MyButton>
              )}
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className={`w-full z-10 bg-black-100 ${className}`}>
          <div className="pt-5 h-full w-full">
            <div className="w-40 max-w-[330px] mx-auto">
              <Link to="/">
                <img
                  src={LogoLongImg}
                  alt="Hate Trackers logo"
                  className="h-full max-w-full object-contain"
                />
              </Link>
            </div>
            {isConnected && (
              <div
                onClick={() => {
                  open();
                }}
                className="font-bold text-center text-white py-5"
              >
                {trimmedAccount}
              </div>
            )}
            {showCreateButton && (
              <Link to="/create">
                <MyButton className="block rounded-none w-full">
                  New entry
                </MyButton>
              </Link>
            )}
          </div>
        </nav>
      );
    }
  }, [className, isConnected, open, showCreateButton, trimmedAccount, isXs]);

  return renderHtml;
}

export default Navbar;
