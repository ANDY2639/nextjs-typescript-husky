import { useState } from "react";

import { VisibilityIcon } from "./components/VisibilityIcon/VisibilityIcon";
import { Input, InputProps } from "../Input";

export type InputPasswordProps = Omit<InputProps, "type" | "endContent">;

const InputPassword = (props: InputPasswordProps) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const getInputType = () => (isHidden ? "password" : "text");

  return <Input {...props} endContent={<VisibilityIcon setIsHidden={setIsHidden} isHidden={isHidden} />} type={getInputType()} />;
};

export default InputPassword;
