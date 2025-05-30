type Props = React.SVGProps<SVGSVGElement>;

const MinusCircleIcon = ({ id, width, height, ...rest }: Props) => {
  return (
    <svg
      id={id ?? "MinusCircleIcon"}
      data-test-id={id ?? "MinusCircleIcon"}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 12}
      height={height ?? 12}
      viewBox="0 0 12 12"
      fill="none"
      {...rest}
    >
      <g clipPath="url(#clip0_294_16901)" stroke="#A1A1AA" strokeWidth={0.9}>
        <circle cx={6} cy={6} r={5} />
        <path d="M7.5 6h-3" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_294_16901">
          <path fill="#fff" d="M0 0H12V12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MinusCircleIcon;
