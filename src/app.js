require('dotenv').config();
const express = require('express');
const path = require('path');
const { url } = require('./config/googleOAuth');
const emailController = require('./controllers/emailController');
require('./queues/emailQueue'); 

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (req, res) => {
  res.render('index', { gmailAuthUrl: url });
});

app.get('/oauth2callback', emailController.googleOAuthCallback);

app.get('/login/outlook', (req, res) => {
  const authUrl = emailController.outlookOAuthCallback.authCodeUrlParameters();
  res.redirect(authUrl);
});

app.get('/redirect', emailController.outlookOAuthCallback);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
