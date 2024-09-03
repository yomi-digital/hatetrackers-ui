import { Link } from "react-router-dom";

interface LinkViewerProps {
  img: string;
  title: string;
  author: string;
  link: string;
  className?: string;
}

function LinkViewer({
  img,
  title,
  author,
  link,
  className = "",
}: LinkViewerProps) {
  return (
    <Link target="_blank" to={link}>
      <img
        src={img}
        className={`w-1/2 max-w-[570px] aspect-video rounded-[21px] object-cover ${className}`}
      />
      <div>
        <p className="mt-6 mb-1 font-medium text-black-100">{author}</p>
        <p className="font-bold text-lg text-black">{title}</p>
      </div>
    </Link>
  );
}

export default LinkViewer;
