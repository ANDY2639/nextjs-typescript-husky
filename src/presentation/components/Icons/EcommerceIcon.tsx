type Props = React.SVGProps<SVGSVGElement>

const EcommerceIcon = ({ id, width, height, ...rest }: Props) => {
  return (
    <svg
      id={id ?? 'EyeOff'}
      data-test-id={id ?? 'EyeOff'}
      xmlns="http://www.w3.org/2000/svg"
      width={ width ?? 20 }
      height={ height ?? 21}
      viewBox="0 0 20 21"
      fill="none"
      {...rest}
    >
      <path
        d="M5.938 2.725h11.25a1.5 1.5 0 01.95.34l.11.1a1.5 1.5 0 01.44 1.06v8.75a1.5 1.5 0 01-.34.95l-.1.11a1.5 1.5 0 01-1.06.44h-1.625V16.1a1.5 1.5 0 01-.34.95l-.1.11a1.5 1.5 0 01-1.06.44H2.813a1.5 1.5 0 01-.95-.34l-.111-.1a1.5 1.5 0 01-.44-1.06V7.35a1.5 1.5 0 01.34-.95l.1-.11a1.5 1.5 0 011.06-.44h1.626V4.225a1.5 1.5 0 01.34-.95l.099-.11a1.5 1.5 0 011.06-.44zM3.063 15.85h10.75v-5.125H3.063v5.125zm3.124-10h7.875a1.5 1.5 0 01.95.34l.111.1a1.5 1.5 0 01.44 1.06v5.375h1.374v-8.25H6.188V5.85zM3.063 8.975h10.75V7.6H3.063v1.375z"
        fill="#FAFAFA"
        stroke="#000"
        strokeWidth={0.125}
      />
    </svg>
  )
}

export default EcommerceIcon
