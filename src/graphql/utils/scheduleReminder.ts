import nodemailer from "nodemailer";
import schedule from "node-schedule";

export default async (email: string, name: string) => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  var date = new Date();
  date.setDate(date.getDay() + 7);
  schedule.scheduleJob(
    `0 0 12 ${date.getDay()} ${date.getMonth()} *`,
    async () => {
      try {
        let mailRes = await transporter.sendMail({
          from: "test@ritindia.edu",
          to: email,
          subject: "book return reminder",
          html: `<h1>Hello ${name}, Please Return your book</h1>`,
        });
        console.log("mail sent", mailRes);
        return `reminder has been set for user ${name}`;
      } catch (error) {
        console.log("unable to send reminder mail to user");
        return `unable to set reminder`;
      }
    }
  );
};
