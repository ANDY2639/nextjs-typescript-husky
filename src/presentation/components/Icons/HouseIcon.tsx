type Props = React.SVGProps<SVGSVGElement>;

const HouseIcon = ({ id, width, height, ...rest }: Props) => {
  return (
    <svg
      id={id ?? "HouseIcon"}
      data-test-id={id ?? "HouseIcon"}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 20}
      height={height ?? 17}
      viewBox="0 0 20 17"
      fill="none"
      {...rest}
    >
      <path
        d="M10 .787a1.5 1.5 0 01.95.34l.11.1 7.684 7.684a.876.876 0 01.187.953l-.068.131a.876.876 0 01-1.03.359l-.083-.03v4.838h1a.876.876 0 01.677 1.43l-.058.064a.875.875 0 01-.619.256H1.25a.875.875 0 01-.555-.197l-.064-.059a.876.876 0 01-.058-1.172l.058-.065a.876.876 0 01.619-.257h1v-4.838l-.083.03a.876.876 0 01-.943-.24l-.09-.118A.875.875 0 011 9.58l.004-.147a.876.876 0 01.155-.41l.096-.112 7.683-7.683A1.5 1.5 0 0110 .787zM9 15.162h2v-3.25H9v3.25zm7-6.521l-6-6-6 6v6.521h3.25v-4.125c0-.203.07-.398.198-.554l.058-.064a.876.876 0 01.619-.257h3.75c.203 0 .399.07.555.198l.064.059a.875.875 0 01.256.618v4.125H16V8.641z"
        fill="#FAFAFA"
        stroke="#fff"
        strokeWidth={0.125}
      />
    </svg>
  );
};

export default HouseIcon;
