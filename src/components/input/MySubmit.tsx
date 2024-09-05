interface MySubmitProps {
  className?: string;
  disabled?: boolean;
  value?: string;
}

function MySubmit({ className, value, disabled }: MySubmitProps) {
  return (
    <input
      className={`text-lg 3xl:text-xl transition-colors bg-pink hover:bg-pink-dark active:bg-pink-dark/80 rounded-md px-4 py-1 shadow-[0_4px_4px_0px_#0000001F] ${className}`}
      type="submit"
      value={value}
      disabled={disabled}
    />
  );
}

export default MySubmit;
