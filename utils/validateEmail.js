function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(`validateEmail ${emailRegex.test(email)}`)
  return emailRegex.test(email);
}

module.exports = validateEmail;
