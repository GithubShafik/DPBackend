export let smsTemplates = {
  otp: {
    message: (infoObj) => {
      return `Your OTP is ${infoObj.otp}`;
    },
  },
};