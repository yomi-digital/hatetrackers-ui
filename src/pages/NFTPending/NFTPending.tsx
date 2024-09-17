import AppWindow from "../../AppWindow";
import CustomMeta from "../../components/CustomMeta";
import Navbar from "../../components/Navbar";
import PendingSection from "./sections/PendingSection";
function NFTPending() {
  return (
    <AppWindow>
      <CustomMeta
        title="NFTPending | HateTrackers"
        description="HateTrackers"
        themeColor="#000000"
      />
      <div>
        <Navbar />
        <PendingSection />
      </div>
    </AppWindow>
  );
}

export default NFTPending;
