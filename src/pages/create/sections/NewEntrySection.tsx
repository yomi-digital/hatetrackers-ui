import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAccount, useSignMessage } from "wagmi";
import * as yup from "yup";
import RadialRedImg from "../../../assets/images/pictures/radial_gradient_red.svg";
import RadialWhiteImg from "../../../assets/images/pictures/radial_gradient_white.svg";
import MyButton from "../../../components/buttons/MyButton";
import MyFileField from "../../../components/input/MyFileField";
import MyInputField from "../../../components/input/MyInputField";
import ImageUploadModal from "../../../components/modals/ImageUploadModal";
import Modal from "../../../components/modals/Modal";
import MyLoader from "../../../components/MyLoader";
import Overlay from "../../../components/Overlay";
import { CommentResponse } from "../../../models/API/comment";

const schema = yup
  .object({
    link: yup.string().required(),
    img: yup.string().required(),
  })
  .required();

function NewEntrySection() {
  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      link: "",
      img: "",
    },
    resolver: yupResolver(schema),
  });
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();

  const [uploadCommentStatus, setUploadCommentStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFileOriginal, setUploadedFileOriginal] = useState<File>();

  const sendComment = useCallback(
    async (link: string, imgUrl: string) => {
      try {
        setUploadCommentStatus("loading");
        const signature = await signMessageAsync({
          message: "Store memorable comment for " + link,
        });

        const res = await axios.post<CommentResponse>(
          import.meta.env.VITE_API_URI + "/comment",
          {
            address,
            link,
            screenshot: imgUrl,
            signature,
          }
        );
        console.log(res);
        if (!res.data.error) {
          setUploadCommentStatus("done");
        } else {
          console.error(res.data.message);
          setUploadCommentStatus("error");
        }
      } catch (err) {
        console.error(err);
        setUploadCommentStatus("error");
      }
    },
    [address, signMessageAsync]
  );

  const onUploadSuccess = useCallback(
    ({ original, uploaded }: { original: File; uploaded: string }) => {
      console.log("uploaded", uploaded);
      setUploadedFileOriginal(original);
      setValue("img", uploaded);
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<{
    link: string;
    img: string;
  }> = (data) => {
    console.log(data);
    sendComment(data.link, `${import.meta.env.VITE_IPFS_URL}${data.img}`);
  };

  const imgHash = getValues().img;

  const renderModalContent = useMemo(() => {
    if (uploadCommentStatus === "idle") {
      return (
        <form
          className="mt-8 bg-black-300 p-5 rounded-[9px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            render={({ field }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { ref, ...rest } = field;
              return (
                <MyInputField
                  label="LINK"
                  placeholder="Paste your link..."
                  className="w-full mt-6"
                  required
                  {...rest}
                />
              );
            }}
            name="link"
            control={control}
            defaultValue={""}
          />
          <MyFileField
            label="IMG"
            placeholder="Upload a photo of your video"
            className="w-full mt-6"
            required
            onIconClick={() => {
              setIsUploadModalOpen(true);
            }}
            value={uploadedFileOriginal}
          />
          {imgHash && imgHash.length > 0 && (
            <div className="mt-6 h-40">
              <img
                src={`${import.meta.env.VITE_IPFS_URL}${imgHash}`}
                alt="Uploaded"
                className="h-full object-cover object-left-top rounded-[5px]"
              />
            </div>
          )}
          <div className="mt-8">
            <MyButton className="w-40">Confirm</MyButton>
          </div>
        </form>
      );
    } else if (uploadCommentStatus === "loading") {
      return (
        <div className="mt-8 flex flex-col justify-center items-center">
          <MyLoader label="Please, wait while we upload your file..." />
        </div>
      );
    } else if (uploadCommentStatus === "done") {
      return (
        <div className="mt-14 flex flex-col justify-center items-center">
          <p className="text-white font-semibold text-center">
            Upload successful!
          </p>
          <Link to="/dashboard" className="mt-10">
            <MyButton>Go to leaderboard</MyButton>
          </Link>
        </div>
      );
    }
  }, [
    handleSubmit,
    control,
    uploadCommentStatus,
    uploadedFileOriginal,
    imgHash,
    setIsUploadModalOpen,
  ]);

  return (
    <div className="relative h-screen-no-navbar-desktop w-full flex justify-center items-center overflow-hidden">
      <Modal className="!w-4/5">
        <h1>
          <span className="red-line">CREATE</span> A NEW ENTRY
        </h1>
        <p className="mt-2 w-2/3">
          Add a youtube link below and a proper handle to create a new entry.
        </p>
        {renderModalContent}
      </Modal>
      {isUploadModalOpen && (
        <Overlay>
          <ImageUploadModal
            onCancelClick={() => {
              setIsUploadModalOpen(false);
            }}
            onCloseClick={() => {
              setIsUploadModalOpen(false);
            }}
            onUploadSuccess={onUploadSuccess}
          />
        </Overlay>
      )}
      <img
        className="-z-10 absolute -bottom-3/4 -right-3/4 w-[70rem] max-w-[70rem] h-[70rem] max-h-[70rem] object-contain scale-150"
        src={RadialRedImg}
        alt="Radial Gradient"
      />
      <img
        className="-z-10 absolute -bottom-1/3 -right-1/5 w-[70rem] max-w-[70rem] h-[70rem] max-h-[70rem] object-contain scale-110"
        src={RadialWhiteImg}
        alt="Radial Gradient"
      />
    </div>
  );
}

export default NewEntrySection;
