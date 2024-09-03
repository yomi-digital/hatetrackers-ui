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
  return (
    <div className={`bg-black-200 rounded-[9px] ${className}`}>
      <div className="flex justify-between px-6 py-4 border-b border-black-100">
        <div>{author}</div>
        <div>{date}</div>
      </div>
      <div className="flex flex-col px-6 py-4 items-start">
        <div>{link}</div>
        <img
          src={img}
          className="w-80 h-40 object-contain rounded-[5px] mt-2"
        />
        <button className="mt-10">
          <Upvote className="w-4 h-4 inline mr-1" />
          <span>{upvotes}</span>
        </button>
      </div>
    </div>
  );
}

export default UploadCard;
