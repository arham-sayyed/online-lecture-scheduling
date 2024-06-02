const jwt = require('jsonwebtoken');
const { getUser } = require(path.join(__dirname, '..', 'models', 'user.js'));

const SECRET_KEY = process.env.JWT_SECRET; // Replace with your own secret key

const navigate = async (req, res) => {
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

