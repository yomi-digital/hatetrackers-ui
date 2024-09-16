import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import BgImage from "../../../assets/images/pictures/bg_vertical.jpg";
import MyButton from "../../../components/buttons/MyButton";
import Modal from "../../../components/modals/Modal";
import QueryWrapper from "../../../components/QueryWrapper";
import { LeaderboardResponse } from "../../../models/API/leaderboard";
import UploadCard from "../components/UploadCard";

function ListSection() {
  const [selectedChip, setSelectedChip] = useState("all");
  const { address } = useAccount();

  const renderLeaderboard = useCallback(
    (data: LeaderboardResponse, refetch: () => void) => {
      if (!data || data?.leaderboard?.length < 1) return null;
      const leaderboardEntriesHtml = data?.leaderboard
        ?.sort((a, b) => {
          if (selectedChip === "top") return b.upvotes - a.upvotes;
          return b.timestamp - a.timestamp;
        })
        .map((leaderboardEntry, index) => (
          <UploadCard
            key={leaderboardEntry._id}
            id={leaderboardEntry._id}
            author={leaderboardEntry.user}
            date={new Date(leaderboardEntry.timestamp).toLocaleDateString()}
            upvotes={leaderboardEntry.upvotes}
            link={leaderboardEntry.link}
            img={leaderboardEntry.screenshot}
            upvoted={leaderboardEntry.upvoted}
            className={index < data.leaderboard.length - 1 ? "mb-5" : ""}
            onUpvoted={() => {
              refetch();
            }}
          />
        ));

      return (
        <>
          <div className="section mt-20 mb-60">
            <div className="flex justify-end mb-5">
              <MyButton
                className="mr-3 w-36"
                buttonStyle={selectedChip == "all" ? "primary" : "secondary"}
                onClick={() => setSelectedChip("all")}
              >
                All
              </MyButton>
              <MyButton
                buttonStyle={selectedChip == "all" ? "secondary" : "primary"}
                className="w-36"
                onClick={() => setSelectedChip("top")}
              >
                Top
              </MyButton>
            </div>
            <Modal>{leaderboardEntriesHtml}</Modal>
          </div>
          {/* <div className="-z-10 absolute -bottom-1/4 -right-1/4 w-full aspect-square bg-gradient-radial from-primary/80 from-20% to-transparent to-70%" />
          <div className="-z-10 absolute top-20 -left-1/4 w-2/3 aspect-square bg-gradient-radial from-white/50 to-transparent to-70%" /> */}
        </>
      );
    },
    [selectedChip]
  );

  return (
    <div className="relative w-full overflow-hidden min-h-screen-no-navbar-desktop">
      <img
        className="-z-10 absolute top-0 h-full left-0 w-full object-cover"
        src={BgImage}
      />
      <QueryWrapper<LeaderboardResponse>
        endpoint={import.meta.env.VITE_API_URI + "/leaderboard?user=" + address}
        loaderRootClassName="mt-40"
        queryKey="leaderboard"
        render={renderLeaderboard}
        errorLabel="Error while fetching leaderboard"
        loadingLabel="Loading leaderboard..."
      />
    </div>
  );
}

export default ListSection;
