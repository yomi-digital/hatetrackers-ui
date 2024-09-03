interface VideoWrapperProps {
  src: string;
}

function VideoWrapper({ src }: VideoWrapperProps) {
  return (
    <video
      className="rounded-lg md:rounded-3xl w-full md:w-4/5 mx-auto"
      controls
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoWrapper;
