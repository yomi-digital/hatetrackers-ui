import AppWindow from "../../AppWindow";
import CustomMeta from "../../components/CustomMeta";
import Navbar from "../../components/Navbar";
import NewEntrySection from "./sections/NewEntrySection";
function Create() {
  return (
    <AppWindow>
      <CustomMeta
        title="Create | HateTrackers"
        description="HateTrackers"
        themeColor="#000000"
      />
      <div>
        <Navbar />
        <NewEntrySection />
      </div>
    </AppWindow>
  );
}

export default Create;
