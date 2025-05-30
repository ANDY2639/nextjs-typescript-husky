type Props = React.SVGProps<SVGSVGElement>;

const EyeIcon = ({ id, width, height, ...rest }: Props) => {
  return (
    <svg
      id={id ?? "Eye"}
      data-test-id={id ?? "Eye"}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 20}
      height={height ?? 20}
      viewBox="0 0 20 20"
      fill="none"
      {...rest}
    >
      <path
        d="M2.729 12.747c-.708-.92-1.063-1.38-1.063-2.747 0-1.366.355-1.826 1.063-2.746 1.414-1.838 3.786-3.92 7.27-3.92 3.486 0 5.857 2.082 7.272
          3.92.708.92 1.062 1.38 1.062 2.746s-.354 1.826-1.062 2.747c-1.415 1.837-3.786 3.92-7.271 3.92s-5.857-2.083-7.271-3.92z"
        stroke="#18181B"
        strokeWidth={1.5}
      />
      <path d="M12.5 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" stroke="#18181B" strokeWidth={1.5} />
    </svg>
  );
};

export default EyeIcon;
