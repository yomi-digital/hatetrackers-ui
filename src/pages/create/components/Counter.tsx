interface CounterProps {
  body: string;
  label: string;
  gradient?: boolean;
  className?: string;
}

function Counter({
  body,
  label,
  className = "",
  gradient = false,
}: CounterProps) {
  return (
    <div className={className}>
      <p className="text-center text-sm">
        <span
          className={`font-medium text-5xl md:text-7xl ${
            gradient
              ? "bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-700"
              : "text-primary"
          }`}
        >
          {body}
        </span>
        <br />
        {label}
      </p>
    </div>
  );
}

export default Counter;
