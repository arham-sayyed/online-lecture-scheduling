const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const jwtDecode = require(path.join(__dirname, 'middlewares', 'jwt-decode.js'));
const allow = require(path.join(__dirname, 'middlewares', 'allow.js'));

const app = express();
const PORT = 5000;

// set view engine and directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwtDecode);

// import routes
const indexRoutes = require(path.join(__dirname, 'routes', 'indexRoutes'));
const instructorRoutes = require(path.join(__dirname, 'routes', 'instructorRoutes'));
const adminRoutes = require(path.join(__dirname, 'routes', 'adminRoutes'));

// use routes
app.use('/', indexRoutes);
app.use('/instructor', allow('instructor'), instructorRoutes);
app.use('/admin/', allow('admin'), adminRoutes);

// simple routing
app.all('/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.redirect('/');
});

// // test routes
// app.get('/admin', allow('admin'), (req, res) => {
//   res.render('admin', {
//     user: req.user,
//   });
// });

app.listen(PORT, () => {
  console.log(`server started at localhost:${PORT}`);
});
