import { HashLoader } from "react-spinners";

interface MyLoaderProps {
  color?: string;
  label?: string;
  loading?: boolean;
  size?: number;
  rootClassName?: string;
  loaderClassName?: string;
  labelClassName?: string;
}

function MyLoader({
  color = "#FFF",
  loading,
  label,
  size,
  rootClassName,
  loaderClassName,
  labelClassName,
}: MyLoaderProps) {
  return (
    <div className={`block ${rootClassName}`}>
      <HashLoader
        loading={loading}
        size={size}
        color={color}
        className={`mx-auto ${loaderClassName}`}
      />
      {label && <p className={`text-center mt-7 ${labelClassName}`}>{label}</p>}
    </div>
  );
}

export default MyLoader;
