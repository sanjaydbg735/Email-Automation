const { google } = require('googleapis');
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

let gmailAuth;
let outlookAuth;

const sendGmail = async (to, subject, body) => {
  const gmail = google.gmail({ version: 'v1', auth: gmailAuth });

  const message = `From: "Your Name" <your-email@gmail.com>
To: ${to}
Subject: ${subject}

${body}`;

  const encodedMessage = Buffer.from(message).toString('base64');
  const sendRequest = {
    userId: 'me',
    resource: {
      raw: encodedMessage,
    },
  };

  await gmail.users.messages.send(sendRequest);
};

const sendOutlookMail = async (to, subject, body) => {
  const client = Client.init({
    authProvider: (done) => {
      done(null, outlookAuth);
    },
  });

  const mail = {
    message: {
      subject: subject,
      body: {
        contentType: "Text",
        content: body,
      },
      toRecipients: [
        {
          emailAddress: {
            address: to,
          },
        },
      ],
    },
  };

  await client.api('/me/sendMail').post(mail);
};

exports.sendEmail = async (emailProvider, to, subject, body) => {
  if (emailProvider === 'gmail') {
    await sendGmail(to, subject, body);
  } else if (emailProvider === 'outlook') {
    await sendOutlookMail(to, subject, body);
  }
};

exports.setGmailAuth = (auth) => {
  gmailAuth = auth;
};

exports.setOutlookAuth = (auth) => {
  outlookAuth = auth;
};
