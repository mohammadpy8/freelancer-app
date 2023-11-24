import React from "react";
import TextField from "../../interface/TextField";
import Loading from "../../interface/Loading";

function SendOTPForm({ phoneNumber, setPhoneNumber, sendOtpHandler, isPending }) {
  return (
    <div>
      <form className="space-y-5" onSubmit={sendOtpHandler}>
        <TextField
          name="phonenumber"
          label="شماره تلفن"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              ارسال کد تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SendOTPForm;
