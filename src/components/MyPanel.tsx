import { PropsWithChildren } from "react";
import MyPanelBase from "./MyPanelBase";

interface MyPanelProps {
  headerText?: string;
  className?: string;
  rootClassName?: string;
}

function MyPanel({
  headerText = "",
  className = "",
  rootClassName = "",
  children,
}: PropsWithChildren<MyPanelProps>) {
  return (
    <MyPanelBase
      rootClassName={`${rootClassName}`}
      className={`${className} relative h-full`}
    >
      <div>
        <span className="text-black text-sm">{headerText}</span>
        <div className="h-px mt-3 bg-black-200" />
      </div>
      {children}
    </MyPanelBase>
    // <div className={`${rootClassName} relative w-full h-screen py-8 px-4`}>
    //   <div
    //     className={`${className} w-full h-full rounded-3xl flex flex-col justify-between py-14`}
    //   >
    //     <div className="px-20">
    //       <span className="text-black text-sm">{headerText}</span>
    //       <div className="h-px mt-3 bg-black-200" />
    //     </div>
    //     {children}
    //   </div>
    // </div>
  );
}

export default MyPanel;
