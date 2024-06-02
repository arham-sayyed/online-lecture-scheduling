const path = require('path');
const { getAllInstructors } = require(path.join(__dirname, '..', 'models', 'firestore.js'));
exports.getAdmin = (req, res) => {
  res.render('admin', { user: req.user });
};

exports.viewInstructors = async (req, res) => {
  const allInstructors = await getAllInstructors();
  res.render('instructors', { user: req.user, instructors: allInstructors });
};
