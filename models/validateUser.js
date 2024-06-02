const axios = require('axios');
const { auth } = require('./firebase.js'); // Import the initialized admin SDK

const firebaseConfig = {
  apiKey: 'AIzaSyC_GAQEYDoEn8wCcWasU9tYiDwXp6OOTSk', // Use your Firebase API key
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const idToken = response.data.idToken;
    const userRecord = await auth.verifyIdToken(idToken);

    return { success: true, user: userRecord, uid: userRecord.uid, message: "nullaaaa" }; // user logged in
  } catch (error) {
    if (error.response) {
      // Handle different error codes from Firebase Auth
      switch (error.response.data.error.message) {
        case 'EMAIL_NOT_FOUND':
          return { succcess: false, uid: null, message: 'User not found' };
        case 'INVALID_PASSWORD':
          return { succcess: false, uid: null, message: 'Wrong password' };
        case 'USER_DISABLED':
          return {
            succcess: false,
            uid: null,
            message: 'User account is disabled',
          };
        default:
          return {
            succcess: false,
            uid: null,
            message: `Error logging in: ${error.response.data.error.message}`,
          };
      }
    } else {
      return {
        succcess: false,
        uid: null,
        message: `Error logging in:, ${error.message}`,
      };
    }
  }
};

// // Example usage:
// const email = 'arhamsayyed56@gmail.com';
// const password = '#123456';

// loginUser(email, password)
//   .then((user) => console.log('Login successful!', user))
//   .catch((error) => console.error('Login failed:', error));

module.exports = loginUser;
