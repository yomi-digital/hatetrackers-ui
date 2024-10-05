import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCountryDataList } from "countries-list";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import * as yup from "yup";
import BgImage from "../../../assets/images/pictures/bg_horizontal.jpg";
import MyButton from "../../../components/buttons/MyButton";
import MyInputField from "../../../components/input/MyInputField";
import MySelectField from "../../../components/input/MySelectField";
import Modal from "../../../components/modals/Modal";
import MyLoader from "../../../components/MyLoader";
import RadioGroup from "../../../components/radio/RadioGroup";
import { RegisterUserResponse } from "../../../models/API/register";
interface SubmitData {
  name: string;
  surname: string;
  email: string;
  sgu: string;
  nationality: string;
  age: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    sgu: yup.string().required(),
    nationality: yup.string().required(),
    age: yup.string().required(),
  })
  .required();

const countriesList = getCountryDataList().map((country) => {
  return {
    label: country.name,
    value: country.name,
  };
});

function InfoFillSection() {
  const { handleSubmit, control } = useForm({
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

  const { address } = useAccount();
  const navigate = useNavigate();
  const [submitData, setSubmitData] = useState<SubmitData>();
  const { isSuccess, isError, isPending, data, isRefetching } =
    useQuery<RegisterUserResponse>({
      queryKey: ["new-user"],
      queryFn: () =>
        axios
          .post("https://tickets-api.mego.tools/applications/new", {
            identifier: "HATE_TRACKERS_TEST",
            address: address,
            email: submitData?.email,
            answers: [
              `${submitData?.name} ${submitData?.surname}, ${submitData?.nationality}`,
              submitData?.sgu,
              submitData?.age,
            ],
          })
          .then((res) => res.data),
      enabled: submitData !== undefined,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  useEffect(() => {
    if (isSuccess && !data.error) {
      navigate("/pending-application");
    }
  }, [isSuccess]);

  const onSubmit = useCallback((data: SubmitData) => {
    console.log(data);
    setSubmitData(data);
  }, []);

  const renderModalContent = useMemo(() => {
    if (!submitData) {
      return (
        <>
          <h1>
            YOU <span className="red-line">DON'T</span> HAVE ANY NFT
          </h1>
          <p className="mt-2 xs:w-2/3">
            Fill out the form, once validated you can view the leaderboard and
            interact with other users
          </p>
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex max-xs:flex-wrap xs:gap-2">
              <Controller
                render={({ field }) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { ref, ...rest } = field;

                  return (
                    <MyInputField
                      label="NAME"
                      placeholder="John"
                      className="w-full xs:w-1/2"
                      // error={errors.name?.message}
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
                      className="w-full xs:w-1/2 max-xs:mt-6"
                      // error={errors.surname?.message}
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
                    // error={errors.email?.message}
                    required
                    {...rest}
                  />
                );
              }}
              name="email"
              control={control}
              defaultValue={""}
            />
            <div className="flex max-xs:flex-wrap xs:gap-2 mt-6">
              <Controller
                render={({ field }) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { ref, ...rest } = field;

                  return (
                    <MyInputField
                      label="SGU"
                      placeholder="SGU"
                      className="w-full xs:w-1/3"
                      // error={errors.sgu?.message}
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
                      options={countriesList}
                      className="w-full xs:w-1/3 max-xs:mt-6"
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
                      rootClassName="max-xs:w-full max-xs:mt-6"
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
              <MyButton className="w-28 2xs:w-40 max-xs:block max-xs:mx-auto">
                Send
              </MyButton>
            </div>
          </form>
        </>
      );
    } else if (isPending || isRefetching) {
      return (
        <>
          <h1>
            SENDING <span className="red-line">NFT</span> REQUEST
          </h1>
          <MyLoader rootClassName="my-10" />
        </>
      );
    } else if (isSuccess && !data.error) {
      return (
        <>
          <h1 className="max-3xs:text-xl max-2xs:text-2xl">
            APPLICATION <span className="red-line">SENT</span> SUCCESSFULLY
          </h1>
          <p className="mt-2 w-full xs:w-2/3">
            Please, wait while we validate your application and come back later.
          </p>
        </>
      );
    } else if (isError || (isSuccess && data.error)) {
      return (
        <>
          <h1>
            SOMETHING WENT <span className="red-line">WRONG</span>
          </h1>
          <p className="mt-2 w-full xs:w-2/3">
            {data?.error
              ? data.message
              : "An error occurred while sending the application"}
          </p>
        </>
      );
    } else {
      return <></>;
    }
  }, [
    submitData,
    handleSubmit,
    onSubmit,
    control,
    isPending,
    isSuccess,
    isError,
    data,
    isRefetching,
  ]);

  return (
    <div className="relative max-xs:py-8 max-xs:min-h-screen-no-navbar-desktop xs:h-screen-no-navbar-desktop w-full flex justify-center items-center overflow-hidden">
      <img
        className="-z-10 absolute top-0 h-full left-0 w-full object-cover"
        src={BgImage}
      />
      <Modal className="section !w-4/5">
        {/* <p>isSuccess: {isSuccess ? "true" : "false"}</p>
        <p>data err: {data?.error ? "true" : "false"}</p> */}
        {renderModalContent}
      </Modal>
    </div>
  );
}

export default InfoFillSection;
