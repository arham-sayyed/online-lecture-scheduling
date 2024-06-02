const path = require('path');
const jwt = require('jsonwebtoken');
const { getUser } = require(path.join(__dirname, '..', 'models', 'user.js'));
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET; // Replace with your own secret key

const jwtDecode = async function (req, res, next) {
  const userCookie = req.cookies.auth_token || '';
  if (userCookie) {
    const decoded = jwt.verify(userCookie, SECRET_KEY);
    req.user = await getUser(decoded.uid);
    req.user.uid = decoded.uid;
    next();
  } else {
    next();
  }
};

module.exports = jwtDecode;
