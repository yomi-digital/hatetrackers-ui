import { ReactNode } from "react";

interface IconTextAtomProps {
  className?: string;
  title: string;
  body: string | ReactNode;
  icon: string;
  iconAlt: string;
  iconCtnClassName?: string;
  iconClassName?: string;
  size?: "small" | "normal";
  footer?: ReactNode;
}

function IconTextAtom({
  className,
  body,
  icon,
  iconAlt,
  title,
  iconCtnClassName,
  iconClassName,
  footer,
  size = "normal",
}: IconTextAtomProps) {
  return (
    <div className={className}>
      <div>
        <div className={iconCtnClassName}>
          <img src={icon} alt={iconAlt} className={iconClassName} />
        </div>
        <div
          className={`font-medium text-black ${
            size === "small" ? "tex-lg mt-3" : "text-xl mt-7"
          } mb-3`}
        >
          <span>{title}</span>
        </div>
        <div className={footer ? "mb-12" : undefined}>
          <p
            className={`text-body ${
              size === "small" ? "text-sm" : "text-base"
            }`}
          >
            {body}
          </p>
        </div>
      </div>
      {footer && footer}
    </div>
  );
}

export default IconTextAtom;
