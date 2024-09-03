import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, useMemo } from "react";
import MyErrorBox from "./MyErrorBox";
import MyLoader from "./MyLoader";

interface QueryWrapperProps<T> {
  queryKey: string;
  endpoint: string;
  loadingLabel: string;
  errorLabel: string;
  loaderRootClassName?: string;
  render: (data: T) => ReactNode;
}

function QueryWrapper<T>({
  endpoint,
  queryKey,
  render,
  errorLabel,
  loadingLabel,
  loaderRootClassName,
}: QueryWrapperProps<T>) {
  const { isPending, error, data, refetch } = useQuery<T>({
    queryKey: [queryKey],
    queryFn: () => axios.get(endpoint).then((res) => res.data),
  });

  const renderedHtml = useMemo(() => {
    if (!data) return null;
    return render(data);
  }, [data, render]);

  // return (
  //   <MyLoader
  //     label={loadingLabel}
  //     rootClassName={`my-10 ${loaderRootClassName}`}
  //   />
  // );
  return (
    <>
      {isPending ? (
        <MyLoader
          label={loadingLabel}
          rootClassName={`my-10 ${loaderRootClassName}`}
        />
      ) : error ? (
        <MyErrorBox
          label={errorLabel}
          rootClassName="my-10"
          onButtonClick={refetch}
        />
      ) : (
        renderedHtml
      )}
    </>
  );
}

export default QueryWrapper;
