const { oauth2Client } = require('../config/googleOAuth');
const { pca, authCodeUrlParameters } = require('../config/outlookOAuth');
const openaiService = require('../services/openaiService');
const emailService = require('../services/emailService');

exports.googleOAuthCallback = async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  emailService.setGmailAuth(oauth2Client);
  res.send('Google Authentication successful! You can close this tab.');
};

exports.outlookOAuthCallback = async (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["Mail.Read", "Mail.Send"],
    redirectUri: process.env.OUTLOOK_REDIRECT_URI,
  };

  try {
    const response = await pca.acquireTokenByCode(tokenRequest);
    emailService.setOutlookAuth(response.accessToken);
    res.send('Outlook Authentication successful! You can close this tab.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during Outlook Authentication');
  }
};

exports.processEmail = async (emailContent) => {
  const category = await openaiService.analyzeEmailContent(emailContent);
  const reply = await openaiService.generateReply(emailContent, category);
  await emailService.sendEmail(reply.provider, reply.to, reply.subject, reply.body);
};
