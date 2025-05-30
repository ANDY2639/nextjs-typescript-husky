import { useMemo } from "react";
import { Progress } from "@heroui/react";

type Props = {
  value: number;
};

const ProgressIndicator: React.FC<Props> = ({ value }) => {
  const { label, color } = useMemo((): { label: string; color: "danger" | "warning" | "primary" | "success" } => {
    if (value < 30) return { label: "Débil", color: "danger" };
    if (value < 60) return { label: "Medio", color: "warning" };
    if (value < 90) return { label: "Fuerte", color: "primary" };
    return { label: "Muy fuerte", color: "success" };
  }, [value]);

  return (
    <div className="flex w-full flex-col gap-2">
      <p className="flex w-full justify-between">
        <span className="text-tiny font-medium">Seguridad:</span>
        <span className="text-tiny font-medium">{label}</span>
      </p>
      <Progress
        classNames={{
          indicator: "rounded-[9999px]",
          track: "rounded-[9999px]",
        }}
        color={color}
        value={value}
      />
    </div>
  );
};

export default ProgressIndicator;
