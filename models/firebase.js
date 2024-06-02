const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require(path.join(__dirname, 'online-lecture-scheduling.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
