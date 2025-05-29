type Props = React.SVGProps<SVGSVGElement>

const CheckCircleIcon = ({ id, width, height, ...rest }: Props) => {
  return (
    <svg
      id={id ?? 'CheckCircleIcon'}
      data-test-id={id ?? 'CheckCircleIcon'}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 12}
      height={height ?? 12}
      viewBox="0 0 12 12"
      fill="none"
      {...rest}
    >
      <g clipPath="url(#clip0_294_16896)" stroke="#17C964" strokeWidth={0.9}>
        <circle cx={6} cy={6} r={5} />
        <path
          d="M4.25 6.25l1 1 2.5-2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_294_16896">
          <path fill="#fff" d="M0 0H12V12H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default CheckCircleIcon