const path = require('path');
const jwt = require('jsonwebtoken');

const { getUser } = require(path.join(__dirname, '..', 'models', 'user.js'));
const validateEmail = require(path.join('..', 'utils', 'validateEmail.js'));
const loginUser = require(path.join(
  __dirname,
  '..',
  'models',
  'validateUser.js'
));

const SECRET_KEY = process.env.JWT_SECRET; // Replace with your own secret key

function validateData(email, password) {
  if (!email || !password) {
    return false;
  } else if (!validateEmail(email)) {
    return false;
  } else {
    return true;
  }
}

exports.navigateFromIndex = async (req, res) => {
  const userCookie = req.cookies.auth_token || '';
  if (userCookie) {
    try {
      const decoded = jwt.verify(userCookie, SECRET_KEY);
      console.log(decoded);
      req.user = decoded;
      console.log(req.user.uid);
      const user = await getUser(req.user.uid);
      const userRole = user.role;
      res.redirect(`/${userRole}`);
    } catch (error) {
      console.log(error);
      res.status(401).send('Invalid Token');
    }
  } else {
    res.render('index');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const isDataValid = validateData(email, password);
  if (isDataValid) {
    const fbResp = await loginUser(email, password);

    if (fbResp.success) {
      console.log(fbResp.success);
      fbResp.user;

      // Create a JWT token
      const token = jwt.sign({ uid: fbResp.uid }, SECRET_KEY, {
        expiresIn: '24h',
      });

      // Set token in a cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 86400000,
      });

      res.redirect('/');
    } else {
      res.send({
        success: fbResp.success,
        message: fbResp.message, // this was the culprit
      });
    }
  } else {
    res.send({ success: false, message: 'email or password is invalid' });
  }
};
