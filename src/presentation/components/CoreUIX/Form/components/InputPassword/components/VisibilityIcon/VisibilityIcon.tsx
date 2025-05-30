import { EyeIcon, EyeOffIcon } from "@/presentation/components/Icons";
import React from "react";

type VisibilityIconProps = {
  setIsHidden: (isHidden: boolean) => void;
  isHidden: boolean;
};

export const VisibilityIcon: React.FC<VisibilityIconProps> = ({ isHidden, setIsHidden }) => {
  return (
    <button className="flex h-full items-center" type="button" onClick={() => setIsHidden(!isHidden)}>
      {isHidden ? <EyeOffIcon height={20} width={20} /> : <EyeIcon height={20} width={20} />}
    </button>
  );
};
