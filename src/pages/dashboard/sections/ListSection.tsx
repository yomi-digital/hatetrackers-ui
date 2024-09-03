import { useState } from "react";
import RadialRedImg from "../../../assets/images/pictures/radial_gradient_red.svg";
import RadialWhiteImg from "../../../assets/images/pictures/radial_gradient_white.svg";
import Modal from "../../../components/Modal";
import MyButton from "../../../components/MyButton";
import UploadCard from "../components/UploadCard";

function ListSection() {
  const [selectedChip, setSelectedChip] = useState("all");

  return (
    <div className="relative w-full overflow-hidden">
      <div className="w-4/5 mx-auto mt-20 mb-60">
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
          <UploadCard
            author="Livio Lombardo"
            date="01/08/24"
            upvotes={25}
            link="https://youtu.be/1hrTfJiqDdU"
            img="https://picsum.photos/400/200"
            className="mb-5"
          />
          <UploadCard
            author="Livio Lombardo"
            date="01/08/24"
            upvotes={25}
            link="https://youtu.be/1hrTfJiqDdU"
            img="https://picsum.photos/400/200"
            className="mb-5"
          />
          <UploadCard
            author="Livio Lombardo"
            date="01/08/24"
            upvotes={25}
            link="https://youtu.be/1hrTfJiqDdU"
            img="https://picsum.photos/400/200"
            className="mb-5"
          />
          <UploadCard
            author="Livio Lombardo"
            date="01/08/24"
            upvotes={25}
            link="https://youtu.be/1hrTfJiqDdU"
            img="https://picsum.photos/400/200"
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
