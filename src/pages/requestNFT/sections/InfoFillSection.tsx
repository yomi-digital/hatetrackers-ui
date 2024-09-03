import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import RadialRedImg from "../../../assets/images/pictures/radial_gradient_red.svg";
import RadialWhiteImg from "../../../assets/images/pictures/radial_gradient_white.svg";
import Modal from "../../../components/Modal";
import MyButton from "../../../components/MyButton";
import MyInputField from "../../../components/MyInputField";
import MySelectField from "../../../components/MySelectField";
import RadioGroup from "../../../components/radio/RadioGroup";

const schema = yup
  .object({
    name: yup.string().required("required"),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    sgu: yup.string().required(),
    nationality: yup.string().required(),
    age: yup.string().required(),
  })
  .required();

function InfoFillSection() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      surname: "",
      sgu: "",
      nationality: "",
      age: "14-19",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{
    name: string;
    surname: string;
    email: string;
    sgu: string;
    nationality: string;
  }> = (data) => {
    console.log(data);
  };

  return (
    <div className="relative h-screen-no-navbar-desktop w-full flex justify-center items-center overflow-hidden">
      <Modal className="!w-4/5">
        <h1>
          YOU <span className="red-line">DON'T</span> HAVE ANY NFT
        </h1>
        <p className="mt-2 w-2/3">
          Fill out the form, once validated you can view the leaderboard and
          interact with other users
        </p>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Controller
              render={({ field }) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { ref, ...rest } = field;

                return (
                  <MyInputField
                    label="NAME"
                    placeholder="John"
                    className="w-1/2"
                    required
                    {...rest}
                  />
                );
              }}
              name="name"
              control={control}
              defaultValue={""}
            />
            <Controller
              render={({ field }) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { ref, ...rest } = field;

                return (
                  <MyInputField
                    label="SURNAME"
                    placeholder="Doe"
                    className="w-1/2"
                    required
                    {...rest}
                  />
                );
              }}
              name="surname"
              control={control}
              defaultValue={""}
            />
          </div>

          <Controller
            render={({ field }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { ref, ...rest } = field;

              return (
                <MyInputField
                  label="E-MAIL"
                  placeholder="name@youremail.com"
                  className="w-full mt-6"
                  required
                  {...rest}
                />
              );
            }}
            name="email"
            control={control}
            defaultValue={""}
          />
          <div className="flex gap-2 mt-6">
            <Controller
              render={({ field }) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { ref, ...rest } = field;

                return (
                  <MyInputField
                    label="SGU"
                    placeholder="SGU"
                    className="w-1/3"
                    required
                    {...rest}
                  />
                );
              }}
              name="sgu"
              control={control}
              defaultValue={""}
            />

            <Controller
              render={({ field }) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { ref, ...rest } = field;

                return (
                  <MySelectField
                    label="NATIONALITY"
                    options={[
                      { label: "USA", value: "usa" },
                      { label: "Canada", value: "canada" },
                      { label: "Italy", value: "italy" },
                    ]}
                    className="w-1/3"
                    required
                    {...rest}
                  />
                );
              }}
              name="nationality"
              control={control}
              defaultValue={""}
            />
            <Controller
              render={({ field }) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { ref, ...rest } = field;

                return (
                  <RadioGroup
                    className="pt-2"
                    label="AGE RANGE"
                    options={[
                      { label: "14-19", value: "14-19" },
                      { label: "19-28", value: "19-28" },
                    ]}
                    required
                    {...rest}
                  />
                );
              }}
              name="age"
              control={control}
              defaultValue={""}
            />
          </div>
          <div className="mt-8">
            <MyButton className="w-40">Send</MyButton>
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

export default InfoFillSection;
