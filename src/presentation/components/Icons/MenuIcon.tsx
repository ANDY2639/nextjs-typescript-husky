type Props = React.SVGProps<SVGSVGElement>

const MenuIcon = ({ id, width, height, ...rest }: Props) => {
  return (
    <svg
      id={id ?? 'CloseIcon'}
      data-test-id={id ?? 'CloseIcon'}
      xmlns="http://www.w3.org/2000/svg"
      width={ width ?? 32 }
      height={ height ?? 32 }
      viewBox="0 0 32 32"
      fill="none"
      {...rest}
    >
      <path
        d="M5 16h22M5 8h22M5 24h22"
        stroke="#FAFAFA"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default MenuIcon
