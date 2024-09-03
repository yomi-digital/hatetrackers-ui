import { useMemo } from "react";
import { Link } from "react-router-dom";
import Upvote from "../../../components/icons/Upvote";

interface UploadCardProps {
  author: string;
  date: string;
  link: string;
  img: string;
  upvotes: number;
  className?: string;
}

function UploadCard({
  author,
  date,
  link,
  img,
  upvotes,
  className = "",
}: UploadCardProps) {
  const trimmedAuthor = useMemo(() => {
    return `${author.slice(0, 4)}...${author.slice(-5)}`;
  }, [author]);

  return (
    <div className={`bg-black-300 rounded-[9px] ${className}`}>
      <div className="flex justify-between px-6 py-4 border-b border-black-100">
        <div className="font-bold">{trimmedAuthor}</div>
        <div className="text-black-400">{date}</div>
      </div>
      <div className="flex flex-col px-6 py-4 items-start">
        <Link
          to={link}
          target="_blank"
          className="font-medium w-2/3 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {link}
        </Link>
        <div className="w-full h-40 flex items-center">
          <img src={img} className="w-full object-contain rounded-[5px] mt-2" />
        </div>
        <button className="mt-10">
          <Upvote className="w-4 h-4 inline mr-1" />
          <span>{upvotes}</span>
        </button>
      </div>
    </div>
  );
}

export default UploadCard;
