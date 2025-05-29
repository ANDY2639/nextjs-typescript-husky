type Props = React.SVGProps<SVGSVGElement>

const CloseIcon = ({ id, width, height, fill, ...rest }: Props) => {
  return (
    <svg
      id={id ?? 'CloseIcon'}
      data-test-id={id ?? 'CloseIcon'}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 25}
      height={height ?? 25}
      viewBox="0 0 25 25"
      fill="none"
      {...rest}
    >
      <path
        d="M7.556 18.75c-.332 0-.664-.122-.926-.384a1.317 1.317 0 010-1.851l9.888-9.885a1.318 1.318 0 011.852 0 1.317 1.317 0 010 1.851l-9.888 9.885a1.267 1.267 0 01-.926.384z"
        fill={ fill || "#18181B"}
      />
      <path
        d="M17.444 18.75c-.332 0-.664-.122-.926-.384L6.63 8.48a1.317 1.317 0 010-1.851 1.318 1.318 0 011.852 0l9.888 9.885a1.317 1.317 0 010 1.85 1.296 1.296 0 01-.926.385z"
        fill={ fill || "#18181B"}
      />
    </svg>
  )
}

export default CloseIcon