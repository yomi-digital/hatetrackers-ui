import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAccount, useSignMessage } from "wagmi";
import Upvote from "../../../components/icons/Upvote";
import { UpvoteResponse } from "../../../models/API/upload";

interface UploadCardProps {
  id: string;
  author: string;
  date: string;
  link: string;
  img: string;
  upvotes: number;
  upvoted?: boolean;
  className?: string;
}

function UploadCard({
  id,
  author,
  date,
  link,
  img,
  upvotes,
  upvoted,
  className = "",
}: UploadCardProps) {
  const { address } = useAccount();
  const [, setUpvoteStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [upvoteOverwrite, setUpvoteOverwrite] = useState<boolean>();
  const { signMessageAsync } = useSignMessage();

  const sendUpvote = useCallback(
    async (commentId: string) => {
      try {
        setUpvoteStatus("loading");
        const signature = await signMessageAsync({
          message: "Store " + commentId + " upvote.",
        });

        const res = await axios.post<UpvoteResponse>(
          import.meta.env.VITE_API_URI + "/upvote",
          {
            address,
            comment: commentId,
            signature,
          }
        );
        console.log(res);
        if (!res.data.error) {
          setUpvoteStatus("done");
          setUpvoteOverwrite(true);
        } else if (res.data.message === "Downvoted correctly") {
          setUpvoteStatus("done");
          setUpvoteOverwrite(false);
        } else {
          console.error(res.data.message);
          setUpvoteStatus("error");
        }
      } catch (err) {
        console.error(err);
        setUpvoteStatus("error");
      }
    },
    [address, signMessageAsync]
  );

  const trimmedAuthor = useMemo(() => {
    return `${author.slice(0, 4)}...${author.slice(-5)}`;
  }, [author]);

  const upvotesDirtyCount = useMemo(() => {
    if (upvoteOverwrite !== undefined) {
      if (upvoteOverwrite !== upvoted) {
        return upvotes + (upvoteOverwrite ? 1 : -1);
      }
    }

    return upvotes;
  }, [upvotes, upvoteOverwrite, upvoted]);

  return (
    <div className={`bg-black-400 rounded-[9px] ${className}`}>
      <div className="flex justify-between px-6 py-4 border-b border-black-200">
        <div className="font-bold">{trimmedAuthor}</div>
        <div className="text-black-500">{date}</div>
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
          <img
            src={img}
            className="w-full h-full object-contain rounded-[5px] mt-4"
          />
        </div>
        <button
          onClick={() => {
            sendUpvote(id);
          }}
          className={`mt-10 ${
            (upvoteOverwrite !== undefined ? upvoteOverwrite : upvoted)
              ? "text-primary"
              : ""
          }`}
        >
          <Upvote className="w-4 h-4 inline mr-1" />
          <span>{upvotesDirtyCount}</span>
        </button>
      </div>
    </div>
  );
}

export default UploadCard;
