type Props = React.SVGProps<SVGSVGElement>;

const ArrowDownIcon = ({ id, width, height, ...rest }: Props) => {
  return (
    <svg
      id={id ?? 'ArrowDownIcon'}
      data-test-id={id ?? 'ArrowDownIcon'}
      xmlns="http://www.w3.org/2000/svg"
      width={ width ?? 20 }
      height={ height ?? 21 }
      viewBox="0 0 20 21"
      fill="none"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.692 7.256a.625.625 0 01.881-.068L10 11.84l5.427-4.65a.625.625 0 01.813.948l-5.833 5c-.234.2-.58.2-.814 0l-5.833-5a.625.625 0 01-.068-.881z"
        fill="#FAFAFA"
      />
    </svg>
  )
}

export default ArrowDownIcon
