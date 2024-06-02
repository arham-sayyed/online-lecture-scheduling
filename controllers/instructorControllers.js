exports.getInstructor = async (req, res) => {
  res.render('instructor', { user: req.user });
};
