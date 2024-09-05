import { PropsWithChildren, useMemo } from "react";
import CloseImg from "../assets/images/icons/close.svg";
import FileImg from "../assets/images/icons/file.svg";
interface FileCardProps {
  className?: string;
  file?: File;
  onCloseClick?: () => void;
}

function FileCard({
  className,
  file,
  onCloseClick,
}: PropsWithChildren<FileCardProps>) {
  const trimmedName = useMemo(() => {
    if (!file?.name) return "";
    return file?.name.length > 20
      ? file?.name.slice(0, 20) + "..."
      : file?.name;
  }, [file?.name]);

  return (
    <div
      className={`flex p-6 bg-black-300 rounded-lg gap-5 shadow-xl ${className}`}
    >
      <img src={FileImg} alt="File" />
      <div className="font-medium">{trimmedName}</div>
      <img
        onClick={() => {
          if (onCloseClick) onCloseClick();
        }}
        src={CloseImg}
        alt="Close"
        className="cursor-pointer"
      />
    </div>
  );
}

export default FileCard;
