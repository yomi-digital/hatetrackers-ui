import AppWindow from "../../AppWindow";
import CustomMeta from "../../components/CustomMeta";
import Navbar from "../../components/Navbar";
import ListSection from "./sections/ListSection";
function Dashboard() {
  return (
    <AppWindow>
      <CustomMeta
        title="Dashboard | HateTrackers"
        description="HateTrackers"
        themeColor="#000000"
      />
      <div>
        <Navbar showCreateButton />
        <ListSection />
      </div>
    </AppWindow>
  );
}

export default Dashboard;
