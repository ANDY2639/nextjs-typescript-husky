import { Input, InputProps } from "@heroui/react";

export interface BaseInputProps extends InputProps {
  name: string;
  helpText?: {
    onClick?: () => void;
    content: React.ReactNode;
  };
}

const BaseInput: React.FC<BaseInputProps> = ({ name, helpText, ...rest }) => {
  return (
    <>
      <Input
        {...rest}
        classNames={{
          label: ["text-tiny"],
          input: ["placeholder:text-default-700/50 dark:placeholder:text-white/60"],
          inputWrapper: ["shadow-sm", "border-none", "bg-default-100"],
        }}
        size="sm"
        data-id={name}
        labelPlacement="inside"
      />
      {helpText && (
        <button className="text-primary font-regular w-full p-1 text-right text-xs underline" onClick={helpText.onClick}>
          {helpText.content}
        </button>
      )}
    </>
  );
};

export default BaseInput;
