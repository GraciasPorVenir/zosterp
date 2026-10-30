import nodemailer from "nodemailer";

const userTest = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: userTest.smtp.host,
  port: userTest.smtp.port,
  secure: userTest.smtp.secure, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: userTest.user,
    pass: userTest.pass,
  },
});

export default async function sendMail({ email, html }) {
  const info = await transporter.sendMail({
    from: "no-reply@zost.erp",
    to: email,
    html: html,
  });
  if (process.env.NODE_ENV === "development")
    console.log(nodemailer.getTestMessageUrl(info));
}
