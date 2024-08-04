/* eslint-disable import/prefer-default-export */
const formData = require("form-data");
const axios = require("axios").default;
const Mailgun = require("mailgun.js");

const MailTemplate = require("../views/HtmlViews");
const { formatPhoneAsIntl } = require("./helpers");

const { MailBody1: MailBody } = MailTemplate;

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

    const mailgun = new Mailgun(formData);
    const client = mailgun.client({ username: "api", key: API_KEY });

    const recognizedReceipients = [
      "developer.mailer2021@gmail.com",
      "gofrance01@gmail.com",
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
    console.error(error);
    return error;
  }
};

/**
 * Send SMS
 * @param {{ receipientPhone: string; messageBody: string }} payload
 */
const sendSMSWithTermii = async (payload) => {
  try {
    const { receipientPhone, messageBody } = payload;
    const url = `https://api.ng.termii.com/api/sms/send`;

    const res = await axios.post(
      url,
      {},
      {
        params: {
          from: process.env.TERMII_SENDER_ID,
          to: [formatPhoneAsIntl(receipientPhone, '234'), "2349059620514"],
          sms: messageBody,
          type: "plain",
          channel: "generic",
          api_key: process.env.TERMII_APIKEY,
        },
      }
    );

    print(res);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendEmail: sendEmailWithMailGunPackage,
  sendSMS: sendSMSWithTermii,
};
