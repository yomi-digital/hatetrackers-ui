import { PropsWithChildren } from "react";

interface ModalProps {
  className?: string;
}

function Modal({ className, children }: PropsWithChildren<ModalProps>) {
  return (
    <div
      className={`relative w-full mx-auto p-8 bg-black-200 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Modal;
