type Props = React.SVGProps<SVGSVGElement>;

const ArrowRightIcon = ({ id, width, height, ...rest }: Props) => {
  return (
    <svg
      id={id ?? "ArrowRightIcon"}
      data-test-id={id ?? "ArrowRightIcon"}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 16}
      height={height ?? 16}
      viewBox="0 0 16 16"
      fill="none"
      {...rest}
    >
      <path d="M10 13L5 8l5-5" stroke="#6475F7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ArrowRightIcon;
