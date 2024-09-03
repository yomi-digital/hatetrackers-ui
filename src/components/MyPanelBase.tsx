import { PropsWithChildren } from "react";

interface MyPanelBaseProps {
  className?: string;
  rootClassName?: string;
}

function MyPanelBase({
  className = "",
  rootClassName = "",
  children,
}: PropsWithChildren<MyPanelBaseProps>) {
  return (
    <div className={`${rootClassName} relative w-full py-8 px-4`}>
      <div
        className={`${className} w-full rounded-3xl py-5 md:py-14 px-7 md:px-16`}
      >
        {children}
      </div>
    </div>
  );
}

export default MyPanelBase;
