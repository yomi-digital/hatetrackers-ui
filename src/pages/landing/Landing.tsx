import AppWindow from "../../AppWindow";
import CustomMeta from "../../components/CustomMeta";
import LoginSection from "./sections/LoginSection";
function Landing() {
  return (
    <AppWindow>
      <CustomMeta
        title="Landing | HateTrackers"
        description="HatTrackers"
        themeColor="#000000"
      />
      <div>
        <LoginSection />
      </div>
    </AppWindow>
  );
}

export default Landing;
