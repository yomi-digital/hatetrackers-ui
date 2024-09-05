interface HamburgerToggleProps {
  onToggle: (value: boolean) => void;
  toggled: boolean;
}

function HamburgerToggle({ onToggle, toggled }: HamburgerToggleProps) {
  const toggleMenu = () => {
    onToggle(!toggled);
  };

  return (
    <div className="hamburger-menu" onClick={toggleMenu}>
      <div className={`bar ${toggled ? "open" : ""}`}></div>
      <div className={`bar ${toggled ? "open" : ""}`}></div>
      <div className={`bar ${toggled ? "open" : ""}`}></div>
    </div>
  );
}

export default HamburgerToggle;
