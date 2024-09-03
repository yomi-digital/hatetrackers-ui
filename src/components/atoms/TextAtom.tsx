import { ReactNode } from "react";

interface TextAtomProps {
  className?: string;
  titleClassName?: string;
  title: string;
  body?: string | ReactNode;
  size?: "small" | "normal";
  footer?: ReactNode;
}

function TextAtom({
  className,
  titleClassName,
  body,
  title,
  footer,
  size = "normal",
}: TextAtomProps) {
  return (
    <div className={className}>
      <div>
        <p
          className={`font-medium text-black whitespace-break-spaces ${titleClassName} ${
            size === "small" ? "tex-lg" : "text-xl"
          } ${body ? "mb-3" : footer ? "mb-6" : ""}`}
        >
          {title}
        </p>
        {body && (
          <div className={footer ? "mb-12" : undefined}>
            <p
              className={`text-body ${
                size === "small" ? "text-sm" : "text-base"
              }`}
            >
              {body}
            </p>
          </div>
        )}
      </div>
      {footer && footer}
    </div>
  );
}

export default TextAtom;
