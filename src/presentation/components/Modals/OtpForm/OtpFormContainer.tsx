import { useEffect, useState } from "react";
import { calculateExpirationDate } from "@/presentation/helpers/date";
import { OtpFormValues } from "./OtpFormConfig";
import OtpForm from "./OtpForm";

type Props = {
  otp: boolean;
  onResendOtp: () => Promise<void>;
  onValidateOtp: (values: OtpFormValues) => Promise<void>;
  onResetMfaToken: () => void;
};

const OtpFormContainer: React.FC<Props> = ({ otp, onValidateOtp, onResendOtp, onResetMfaToken }) => {
  const OTP_DURATION_MINUTES = 3;
  const [otpExpiredDate, setOtpExpiredDate] = useState<Date | null>(null);
  const [enableResendOtp, setEnableResendOtp] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);
  const [isExpiredOtp, setIsExpiredOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleValidateOtp = async (values: OtpFormValues) => {
    try {
      await onValidateOtp(values);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await onResendOtp();
      setOtpExpiredDate(calculateExpirationDate(OTP_DURATION_MINUTES));
      setDisabledForm(false);
      setIsExpiredOtp(false);
      setEnableResendOtp(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpireOtp = () => {
    setOtpExpiredDate(null);
    setDisabledForm(true);
    setIsExpiredOtp(true);
    setEnableResendOtp(true);
  };

  useEffect(() => {
    if (otp) {
      setOtpExpiredDate(calculateExpirationDate(OTP_DURATION_MINUTES));
    }
  }, [otp]);

  return (
    <OtpForm
      otp={otp}
      isLoading={isLoading}
      isExpiredOtp={isExpiredOtp}
      enableResendOtp={enableResendOtp}
      disabledForm={disabledForm}
      otpExpiredDate={otpExpiredDate}
      onSubmitOtp={handleValidateOtp}
      onExpireOtp={handleExpireOtp}
      onResendOtp={handleResendOtp}
      onResetMfaToken={onResetMfaToken}
    />
  );
};

export default OtpFormContainer;
