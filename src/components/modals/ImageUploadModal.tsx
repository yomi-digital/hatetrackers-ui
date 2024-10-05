import axios from "axios";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAccount, useSignMessage } from "wagmi";
import UploadImg from "../../assets/images/icons/upload.svg";
import { UploadResponse } from "../../models/API/upvote";
import MyButton from "../buttons/MyButton";
import FileCard from "../FileCard";
import MyLoader from "../MyLoader";
import Modal from "./Modal";

interface ImageUploadModalProps {
  onCancelClick: () => void;
  onCloseClick: () => void;
  onUploadSuccess?: ({
    original,
    uploaded,
  }: {
    original: File;
    uploaded: string;
  }) => void;
  className?: string;
}

function ImageUploadModal({
  className,
  onCancelClick,
  onCloseClick,
  onUploadSuccess,
}: PropsWithChildren<ImageUploadModalProps>) {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
    setSelectedFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    disabled: selectedFile !== undefined,
  });

  const uploadMedia = useCallback(async () => {
    if (!selectedFile) return;
    try {
      console.log(selectedFile);
      setUploadStatus("loading");
      const signature = await signMessageAsync({
        message: "Upload file on HateTrackers.",
      });

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("signature", signature);
      formData.append("address", address || "");
      const res = await axios.post<UploadResponse>(
        import.meta.env.VITE_API_URI + "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      if (!res.data.error) {
        setUploadStatus("done");
        if (onUploadSuccess) {
          onUploadSuccess({
            original: selectedFile,
            uploaded: res.data.image,
          });
        }
      } else {
        console.error(res.data.message);
        setUploadStatus("error");
      }
    } catch (err) {
      console.error(err);
      setUploadStatus("error");
    }
  }, [selectedFile, signMessageAsync, address, onUploadSuccess]);

  const renderModalContent = useMemo(() => {
    if (!selectedFile) {
      return (
        <div className="flex flex-col justify-center items-center">
          <img src={UploadImg} alt="Upload" />
          <p className="mt-6 mb-1 font-normal">
            Select a file or drag and drop here
          </p>
          <p className="text-black-600 font-normal">
            JPG, PNG or PDF, file size no more than 10MB
          </p>
          <MyButton className="mt-8">Select file</MyButton>
        </div>
      );
    } else if (uploadStatus === "loading") {
      return (
        <div className="flex flex-col justify-center items-center">
          <MyLoader />
          <p className="text-black-600 font-normal mt-4">
            Please, wait while we upload your file...
          </p>
        </div>
      );
    } else if (uploadStatus === "done") {
      return (
        <div className="flex flex-col justify-center items-center">
          <p className="text-white font-semibold text-center">
            Upload successful!
            <br />
            Your file is now available for viewing
          </p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center">
          <FileCard
            file={selectedFile}
            onCloseClick={() => {
              setSelectedFile(undefined);
            }}
          />
          <p className="text-black-600 font-normal mt-4">
            JPG, PNG or PDF, file size no more than 10MB
          </p>
          {/* <MyButton className="mt-8">Select file</MyButton> */}
        </div>
      );
    }
  }, [selectedFile, uploadStatus]);

  const renderFooter = useMemo(() => {
    if (uploadStatus === "done") {
      return (
        <div className="flex justify-center xs:justify-end mt-8 px-2 2xs:px-4 xs:px-8 py-4 bg-black-300 rounded-b-lg">
          <MyButton
            className="w-24 2xs:w-32"
            onClick={() => {
              if (onCloseClick) onCloseClick();
            }}
          >
            Close
          </MyButton>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center xs:justify-end gap-2 2xs:gap-4 mt-8 px-2 2xs:px-4 xs:px-8 py-4 bg-black-300 rounded-b-lg">
          <MyButton
            disabled={uploadStatus === "loading"}
            className="w-24 2xs:w-32"
            buttonStyle="tertiary"
            onClick={onCancelClick}
          >
            Cancel
          </MyButton>
          <MyButton
            onClick={() => {
              uploadMedia();
            }}
            disabled={uploadStatus === "loading"}
            className="w-24 2xs:w-32"
          >
            Upload
          </MyButton>
        </div>
      );
    }
  }, [uploadStatus, onCloseClick, onCancelClick, uploadMedia]);

  return (
    <Modal className={`!bg-black-100 !px-0 !pb-0 ${className}`}>
      <h2>Upload an image</h2>
      <p className="font-normal text-sm text-center mt-4 mb-4 px-2 text-black-600">
        Choose a photo from your gallery to show the origin thread
      </p>
      <div className="px-4 2xs:px-8 xs:px-16">
        <div
          {...getRootProps()}
          className="px-2 3xs:px-4 2xs:px-6 xs:px-10 py-2 3xs:py-4 2xs:py-10 xs:py-14 border border-dashed border-black-500 rounded-[10px]"
        >
          <input {...getInputProps()} />
          {renderModalContent}
        </div>
      </div>
      {renderFooter}
    </Modal>
  );
}

export default ImageUploadModal;
