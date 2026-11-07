import "dotenv/config";
import nodemailer, { type Transporter } from "nodemailer";

export async function createTestTransporter() {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return { transporter, testAccount };
}

interface IMail {
  email: string;
  html: string;
  transporter?: Transporter;
}

export async function sendMail({ email, html, transporter }: IMail) {
  const activeTransporter =
    transporter ?? (await createTestTransporter()).transporter;
  const info = await activeTransporter.sendMail({
    to: email,
    from: "no-reply@zosterp.corp",
    html,
  });
  if (process.env.NODE_ENV === "development")
    console.log(nodemailer.getTestMessageUrl(info));
}
