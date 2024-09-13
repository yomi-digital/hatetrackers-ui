import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import RadialRedImg from "../../../assets/images/pictures/radial_gradient_red.svg";
import RadialWhiteImg from "../../../assets/images/pictures/radial_gradient_white.svg";
import MyButton from "../../../components/buttons/MyButton";
import Modal from "../../../components/modals/Modal";
import QueryWrapper from "../../../components/QueryWrapper";
import { LeaderboardResponse } from "../../../models/API/leaderboard";
import UploadCard from "../components/UploadCard";

function ListSection() {
  const [selectedChip, setSelectedChip] = useState("all");
  const { address } = useAccount();

  const renderLeaderboard = useCallback(
    (data: LeaderboardResponse) => {
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
          />
        ));

      return <>{leaderboardEntriesHtml}</>;
    },
    [selectedChip]
  );

  return (
    <div className="relative w-full overflow-hidden">
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
        <Modal>
          <QueryWrapper<LeaderboardResponse>
            endpoint={
              import.meta.env.VITE_API_URI + "/leaderboard?user=" + address
            }
            queryKey="leaderboard"
            render={renderLeaderboard}
            errorLabel="Error while fetching leaderboard"
            loadingLabel="Loading leaderboard..."
          />
        </Modal>
      </div>
      <img
        className="-z-10 absolute -bottom-1/3 -right-3/4 w-[70rem] max-w-[70rem] h-[70rem] max-h-[70rem] object-contain scale-150"
        src={RadialRedImg}
        alt="Radial Gradient"
      />
      <img
        className="-z-10 absolute bottom-0 right-0"
        src={RadialWhiteImg}
        alt="Radial Gradient"
      />
    </div>
  );
}

export default ListSection;
