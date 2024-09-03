import AppWindow from "../../AppWindow";
import CustomMeta from "../../components/CustomMeta";
import Navbar from "../../components/Navbar";
import InfoFillSection from "./sections/InfoFillSection";
function RequestNFT() {
  return (
    <AppWindow>
      <CustomMeta
        title="RequestNFT | HateTrackers"
        description="HateTrackers"
        themeColor="#000000"
      />
      <div>
        <Navbar />
        <InfoFillSection />
      </div>
    </AppWindow>
  );
}

export default RequestNFT;
