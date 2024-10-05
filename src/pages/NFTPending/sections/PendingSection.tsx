import BgImage from "../../../assets/images/pictures/bg_horizontal.jpg";
import Modal from "../../../components/modals/Modal";

function PendingSection() {
  return (
    <div className="relative h-screen-no-navbar-desktop w-full flex justify-center items-center overflow-hidden">
      <img
        className="-z-10 absolute top-0 h-full left-0 w-full object-cover"
        src={BgImage}
      />
      <Modal className="section !w-[90%] 2xs:!w-4/5 max-xs:-mt-20">
        <h1>
          APPLICATION <span className="red-line">PENDING</span>
        </h1>
        <p className="mt-2 w-full xs:w-2/3">
          We are validating your application, refresh to check when everything
          is ready.
        </p>
      </Modal>
    </div>
  );
}

export default PendingSection;
