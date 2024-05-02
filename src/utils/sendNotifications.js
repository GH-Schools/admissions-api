/* eslint-disable import/prefer-default-export */
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const MailTemplate = require("../templates/HtmlTemplates");

const { MailBody } = MailTemplate;

/**
 * Email sender
 * @param {{
 * receipientEmail: string;
 * subject: string;
 * content: string;
 * origin: string
 * }} payload
 * @param {boolean} withCC
 * @returns
 */
const sendEmailWithMailGunPackage = async (payload, withCC = true) => {
  try {
    const SENDER_EMAIL = process.env.MAIL_SENDER_EMAIL;
    const API_KEY = process.env.MAILGUN_API_KEY;
    const DOMAIN = process.env.MAILGUN_DOMAIN;

    const { receipientEmail, subject, content } = payload;
    // print(payload);

    const mailgun = new Mailgun(formData);
    const client = mailgun.client({ username: "api", key: API_KEY });

    const recognizedReceipients = [
      "developer.mailer2021@gmail.com",
    ];
    const receipientIndex = Math.floor(
      Math.random() * recognizedReceipients.length
    );

    const chosenEmail = recognizedReceipients.includes(receipientEmail)
      ? receipientEmail
      : (() => recognizedReceipients[receipientIndex])();

    const messageData = {
      from: `GH SCHOOLS <${SENDER_EMAIL}>`,
      to: chosenEmail,
      subject,
      html: MailBody({
        subject,
        content,
      }),
    };

    if (withCC) {
      messageData.cc = recognizedReceipients.filter(
        (each) => each !== chosenEmail
      );
    }

    const res = await client.messages.create(DOMAIN, messageData);
    return res;
  } catch (error) {
    print(error, { type: "error" });
    return error;
  }
};

module.exports = {
  sendEmail: sendEmailWithMailGunPackage,
  sendSMS: async (payload) => {
    // const {
    //   senderPhone, receipientPhone, subject, content
    // } = payload;
    print(payload);
  },
};
