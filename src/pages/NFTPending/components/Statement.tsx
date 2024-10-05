interface StatementProps {
  img: string;
  name: string;
  role: string;
  body: string;
  className?: string;
}

function Statement({ img, name, role, body, className = "" }: StatementProps) {
  return (
    <div
      className={`flex max-md:flex-col max-md:items-center max-md:text-center px-10 md:px-20 ${className}`}
    >
      <img
        src={img}
        alt={name}
        className="w-48 2xs:w-60 md:w-80 h-48 2xs:h-60 md:h-80 rounded-3xl object-cover border-2 border-primary-200"
      />
      <div className="flex flex-col justify-center text-sm 2xs:text-base md:pl-16 max-md:mt-10">
        <p className="font-ibmplexmono mb-4 text-primary">“{body}”</p>
        <p className="font-medium text-primary">
          {name}, <span className="font-semibold">{role}</span>
        </p>
      </div>
    </div>
  );
}

export default Statement;
