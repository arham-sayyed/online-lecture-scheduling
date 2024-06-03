const path = require('path');
const { db, auth } = require(path.join(__dirname, 'firebase.js'));

async function getUser(uid) {
  const userRef = await db.collection('users').doc(uid).get();
  if (userRef) {
    return userRef.data();
  } else {
    return false;
  }
}

/**
 * Adds a new user to the firebase auth and firestore.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {string} displayName - The display name of the user.
 * @param {string} photoURL - The URL of the user's photo.
 * @param {string} [role='instructor'] - The role of the user. Defaults to 'instructor'.
 * @return {Promise<string|boolean>} - The UID of the newly created user if successful, or false otherwise.
 */
async function addUser(
  email,
  password,
  displayName,
  photoURL,
  role = 'instructor'
) {
  console.log('addUser started execution');

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
      photoURL,
    });

    if (userRecord.uid) {
      await db
        .collection('users')
        .doc(userRecord.uid)
        .set({ email, displayName, photoURL, role });
      console.log('user added with uid: ', userRecord.uid);
      return userRecord.uid;
    } else {
      console.log('user not added because of error: ', userRecord);
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
// async function b() {

//     const a = await getUser("nVP3nVDUcnY1RvgzWqSTiQssdql1");
//     console.log(a)
//     console.log(a.role)
// }
// b()
// addUser(
//   'notarhamsayyed56@gmail.com',
//   '#123456',
//   'instructor notarham sayyed',
//   'https://firebasestorage.googleapis.com/v0/b/anonshare-2c30f.appspot.com/o/users%2FqxHlZLPxOXaWWyvoHbmxQhAfyAn2%2F1716806518663_me-wp.jpg?alt=media&token=b6a6f049-395b-47e6-b6f3-df9f4dc9e991',
//   'instructor'
// );

module.exports = {
  getUser,
  addUser,
};
