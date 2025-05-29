import { TitleAndSubtitle } from "./displayTexts"

type Props = {
  display: TitleAndSubtitle
}

const FormHeader: React.FC<Props> = ({ display }) => {
  return (
    <hgroup className="flex flex-col w-full">
      <h3 className="text-large not-italic font-bold">{display.title}</h3>
      <h4 className="text-small not-italic font-normal">{display.subtitle}</h4>
    </hgroup>
  )
}

export default FormHeader
