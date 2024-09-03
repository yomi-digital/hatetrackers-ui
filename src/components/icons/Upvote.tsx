interface UpvoteProps {
  className?: string;
}

function Upvote({ className }: UpvoteProps) {
  return (
    <svg
      width="7"
      height="9"
      viewBox="0 0 7 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.625 5.8125L3.625 1M3.625 1L1 3.46094M3.625 1L6.25 3.46094"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.3125 8L4.9375 8"
        stroke="currentColor"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default Upvote;
