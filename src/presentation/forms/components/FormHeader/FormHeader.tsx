import { TitleAndSubtitle } from "./displayTexts";

type Props = {
  display: TitleAndSubtitle;
};

const FormHeader: React.FC<Props> = ({ display }) => {
  return (
    <hgroup className="flex w-full flex-col">
      <h3 className="text-large font-bold not-italic">{display.title}</h3>
      <h4 className="text-small font-normal not-italic">{display.subtitle}</h4>
    </hgroup>
  );
};

export default FormHeader;
