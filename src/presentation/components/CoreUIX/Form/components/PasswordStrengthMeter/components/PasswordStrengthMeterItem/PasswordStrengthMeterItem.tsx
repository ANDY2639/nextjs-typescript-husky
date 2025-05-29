import { CheckCircleIcon, MinusCircleIcon } from "@/presentation/components/Icons"

type Props = {
  text: string
  validator: boolean
}

const PasswordStrengthMeterItem: React.FC<Props> = ({ text, validator }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {validator ? <CheckCircleIcon /> : <MinusCircleIcon />}
      <p className={`text-tiny text-${validator ? 'success': 'default-400'}`}>{text}</p>
    </div>
  )
}

export default PasswordStrengthMeterItem
