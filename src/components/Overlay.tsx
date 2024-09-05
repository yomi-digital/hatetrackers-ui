import { PropsWithChildren } from "react";

interface OverlayProps {
  className?: string;
}

function Overlay({ className, children }: PropsWithChildren<OverlayProps>) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-90 py-44 px-32 bg-black/80">
      {children}
    </div>
  );
}

export default Overlay;
