import http from "./httpsServices";

function getOTP(data) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

function checkOTP(data) {
  return http.post("/user/check-otp", data).then((data) => data.data);
}

function completeProfile(data) {
  return http.post("/user/complete-profile", data).then((data) => data.data);
}

export { getOTP, checkOTP, completeProfile };
