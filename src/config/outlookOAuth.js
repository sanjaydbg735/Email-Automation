const { PublicClientApplication } = require('@azure/msal-node');

const config = {
  auth: {
    clientId: process.env.OUTLOOK_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/' + process.env.OUTLOOK_TENANT_ID,
    redirectUri: 'http://localhost:3000/redirect',
  }
};

const pca = new PublicClientApplication(config);

const authCodeUrlParameters = {
  scopes: ["Mail.Read", "Mail.Send"],
  redirectUri: "http://localhost:3000/redirect",
};

module.exports = {
  pca,
  authCodeUrlParameters
};
