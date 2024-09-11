import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import LogoLongImg from "../assets/images/logo_long.svg";
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

  const trimmedAccount = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-5)}`;
  }, [address]);

  return (
    <nav className={`h-navbar-desktop w-full z-10 bg-black-100 ${className}`}>
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
            <MyButton buttonStyle="secondary" className="block" onClick={open}>
              {trimmedAccount}
            </MyButton>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
