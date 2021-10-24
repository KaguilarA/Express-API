require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = token => {
  return new Promise((resolve, reject) => {
    client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    }).then(tickerData => {
      const googleUserData = tickerData.getPayload();
      resolve({
        firstName: googleUserData.given_name,
        firstSurname: googleUserData.family_name,
        email: googleUserData.email,
        img: googleUserData.picture,
        password: `@@@`,
        googleTokenLogin: true,
        role: 1
      });
    }).catch(err => reject(err));
  });
};
