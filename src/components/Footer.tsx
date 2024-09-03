import { Link } from "react-router-dom";
import HeartImg from "../assets/images/icons/heart.svg";
// import DiscordImg from "../assets/images/icons/Discord.svg";
// import InstagramImg from "../assets/images/icons/Instagram.svg";
// import TelegramImg from "../assets/images/icons/Telegram.svg";
// import TwitterImg from "../assets/images/icons/Twitter.svg";
import LogoLongImg from "../assets/images/logo_long.png";
import { useBreakpoint } from "../hooks/UseBreakpoint";
import MyButton from "./MyButton";

interface FooterProps {
  className?: string;
}

function Footer({ className = "" }: FooterProps) {
  const { isLg } = useBreakpoint("lg");

  return (
    <footer className={`px-8 py-8 ${className}`}>
      <Link to="/">
        <img src={LogoLongImg} alt="ResearchHub Foundation" className="w-52" />
      </Link>
      <div className="flex justify-between mt-6">
        <div className="flex flex-col justify-between">
          <Link to="mailto:support@researchhub.foundation">
            <MyButton
              size={isLg ? "medium" : "small"}
              className="text-sm font-medium"
            >
              support@researchhub.foundation
            </MyButton>
          </Link>
          <div className="text-black text-sm 2xl:text-sm">
            <span>
              Made with <img src={HeartImg} alt="Heart" className="inline" /> by{" "}
              <a href="https://yomi.digital" target="_blank">
                YOMI
              </a>
            </span>
          </div>
        </div>
        <div className="w-1/5 lg:w-1/4 xl:w-1/3" />
        <div className="flex w-full justify-between items-start">
          <ul>
            <li className="footer-li">
              <Link to="/get-involved">Get Involved</Link>
            </li>
            <li className="footer-li">
              <Link to="/about">About</Link>
            </li>
            <li className="footer-li">
              <Link to="/research-coin">ResearchCoin</Link>
            </li>
            <li className="footer-li">
              <Link to="/funding">Funding</Link>
            </li>
          </ul>
          <ul>
            <li className="footer-li">Terms of Service</li>
            <li className="footer-li">Privacy Policy</li>
            <li className="footer-li">Blog</li>
          </ul>
          <ul>
            <li className="footer-li">
              <Link to="https://x.com/ResearchHubF" target="_blank">
                Twitter
              </Link>
            </li>
            <li className="footer-li">
              <Link
                to="https://www.linkedin.com/company/researchhub-foundation/"
                target="_blank"
              >
                Linkedin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
