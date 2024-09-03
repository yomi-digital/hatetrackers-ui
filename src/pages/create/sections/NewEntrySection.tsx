import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import RadialRedImg from "../../../assets/images/pictures/radial_gradient_red.svg";
import RadialWhiteImg from "../../../assets/images/pictures/radial_gradient_white.svg";
import Modal from "../../../components/Modal";
import MyButton from "../../../components/MyButton";
import MyFileField from "../../../components/MyFileField";
import MyInputField from "../../../components/MyInputField";

const schema = yup
  .object({
    link: yup.string().required(),
    img: yup.mixed().required(),
    hashtag: yup.string().required(),
  })
  .required();

function NewEntrySection() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      link: "",
      img: undefined,
      hashtag: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{
    link: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: any;
    hashtag: string;
  }> = (data) => {
    console.log(data);
  };

  return (
    <div className="relative h-screen-no-navbar-desktop w-full flex justify-center items-center overflow-hidden">
      <Modal className="!w-4/5">
        <h1>
          <span className="red-line">CREATE</span> A NEW ENTRY
        </h1>
        <p className="mt-2 w-2/3">
          Add a youtube link below and a proper handle to create a new entry.
        </p>
        <form
          className="mt-8 bg-black-200 p-5 rounded-[9px]"
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
          <Controller
            render={({ field }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { ref, ...rest } = field;

              return (
                <MyFileField
                  label="IMG"
                  id="screenshot"
                  placeholder="Upload a photo of your video"
                  className="w-full mt-6"
                  required
                  {...rest}
                />
              );
            }}
            name="link"
            control={control}
            defaultValue={undefined}
          />
          <Controller
            render={({ field }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { ref, ...rest } = field;

              return (
                <MyInputField
                  label="#"
                  placeholder="#hashtag"
                  className="w-full mt-6"
                  required
                  {...rest}
                />
              );
            }}
            name="hashtag"
            control={control}
            defaultValue={""}
          />

          <div className="mt-8">
            <MyButton className="w-40">Confirm</MyButton>
          </div>
        </form>
      </Modal>
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
