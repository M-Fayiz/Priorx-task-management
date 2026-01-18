import nodemailer from "nodemailer";
import envConfig from "./env.config";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envConfig.EMAIL,
    pass: envConfig.PASS_KEY,
  },
});

export default transport;
