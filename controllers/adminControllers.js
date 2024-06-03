const path = require('path');
const { getAllInstructors } = require(path.join(__dirname, '..', 'models', 'firestore.js'));
const { addUser } = require(path.join(__dirname, '..', 'models', 'user.js'));

// admin dashboard routes
exports.getAdmin = (req, res) => {
  res.render('admin', { user: req.user });
};

// view instructors routes
exports.viewInstructors = async (req, res) => {
  const allInstructors = await getAllInstructors();
  res.render('instructors', { user: req.user, instructors: allInstructors });
};

// add user routes
exports.getAddUserPage = (req, res) => {
  res.render('addUser', { user: req.user });
}

exports.addNewUser = async (req, res) => {
  const { displayName, email, photoURL, role, password } = req.body;

  console.log(displayName, email, photoURL, role, password);
  if (!displayName || !email || !photoURL || !role || !password) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }
  else {
    try {
      const user = await addUser(email, password, displayName, photoURL, role);
      // Nothing is being executed after this
      console.log(user);
      if (user.code) {
        console.log(user.code);
        return res.status(400).json({ message: user.message}); // return and respond to end the function and response
      }

      console.log('user: ', user);
      // const user = ''
      if (user) {
        res.status(201).json({ message: 'User added successfully' });
      } else {
        res.status(500).json({ message: 'Failed to add user' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
