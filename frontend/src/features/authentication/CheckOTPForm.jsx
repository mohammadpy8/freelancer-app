import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { checkOTP } from "../../services/authServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiArrowCircleRight } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import Loading from "../../interface/Loading";

const RESEND_OTP_CODE_TIME = 90;

function CheckOTPForm({ phoneNumber, onBack, onResendOTP, otpResponse }) {
  const [otp, setOtp] = useState("");
  const [numberInputOTP, setNumberInputOTP] = useState(6);
  const [errorOTP, setErrorOTP] = useState(false);
  const [time, setTime] = useState(RESEND_OTP_CODE_TIME);
  const { isPending, error, data, mutateAsync } = useMutation({
    mutationFn: checkOTP,
  });

  const navigate = useNavigate();

  const checkOTPHandler = async (event) => {
    event.preventDefault();
    try {
      const { message, user } = await mutateAsync({ phoneNumber, otp });
      toast.success(message);
      if (!user.isActive) return navigate("/complet-profile");
      if (user.status !== 2) {
        navigate("/");
        toast.error("پروفایل شما در انتظار در تایید است");
        return;
      }
      if (user.role === "OWNER") return navigate("/owner");
      if (user.role === "FREELANCER") return navigate("/freelancer");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setErrorOTP(true);
    }
  };

  const borderOTP = (value) => {
    if (value && otp.length === numberInputOTP) {
      return "2px solid red";
    } else if (otp.length <= numberInputOTP) {
      return "2px solid rgb(var(--color-primary-400))";
    }
  };
  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  useEffect(() => {
    if (otp.length < numberInputOTP) setErrorOTP(false);
  }, [otp]);

  return (
    <div>
      <button onClick={onBack}>
        <HiArrowCircleRight size={25} className="text-secondary-600" />
      </button>
      {}
      {otpResponse && (
        <p className="flex items-center gap-x-2 my-4">
          <span>{otpResponse?.message}</span>
          <button onClick={onBack}>
            <CiEdit className="w-8 h-7 text-primary-900 text-bold" />
          </button>
        </p>
      )}
      <div className="mb-4 text-secondary-500">
        {time > 0 ? (
          <p>{time} تا ارسال مجدد کد</p>
        ) : (
          <button onClick={onResendOTP}>ارسال مجدد کد تایید</button>
        )}
      </div>
      <form className="space-y-8" onSubmit={checkOTPHandler}>
        <p className="font-bold text-secondary-800">کد تایید را وارد کنید</p>
        <div className="focus:border-primary-500">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={numberInputOTP}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input type="number" {...props} />}
            containerStyle="flex flex-row-reverse gap-x-2 justify-center focus:border-2"
            inputStyle={{
              width: "2.5rem",
              padding: "0.5rem 0.2rem",
              border: borderOTP(errorOTP),
              borderRadius: "0.7rem",
              outline: "none",
              fontWeight: 600,
            }}
          />
        </div>
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CheckOTPForm;
