import React, { useState } from "react";
import TextField from "../../interface/TextField";
import RadioInput from "../../interface/RadioInput";
import { completeProfile } from "../../services/authServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../interface/Loading";
import { useNavigate } from "react-router-dom";

function CompleteProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: completeProfile,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user, message } = mutateAsync({ name, email, role });
      toast.success(message);
      console.log(user, message);
      if (user.status !== 2) {
        navigate("/");
        toast.error("پروفایل شما در انتظار در تایید است");
        return;
      }
      if (user.role === "OWNER") return navigate("/owner");
      if (user.role === "FREELANCER") return navigate("/freelancer");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center pt-[25px]">
      <div className="w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <TextField
            label="نام و نام خانوادگی"
            name="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <TextField
            label="ایمیل"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <div className="flex items-center justify-center gap-x-8">
            <RadioInput
              name="role"
              value="OWNER"
              id="OWNER"
              label="کارفرما"
              onChange={(event) => setRole(event.target.value)}
              check={role === "OWNER"}
            />
            <RadioInput
              name="role"
              value="FREELANCER"
              id="FREELANCER"
              label="فریلنسر"
              onChange={(event) => setRole(event.target.value)}
              check={role === "FREELANCER"}
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
    </div>
  );
}

export default CompleteProfileForm;
