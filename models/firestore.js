const path = require('path');
const { db } = require(path.join(__dirname, 'firebase.js')); // Import Firestore instance from firebase.js

/**
 * Asynchronously fetches all users with the role of 'instructor' from Firestore, logs them, and returns the array.
 * @returns {Promise<Array>} - A promise that resolves to an array of instructor objects.
 */
async function getAllInstructors() {
    try {
        const usersCollection = db.collection('users');
        // Query to select users where the role is 'instructor'
        const instructorsQuery = usersCollection.where('role', '==', 'instructor');
        const snapshot = await instructorsQuery.get();
        
        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }

        // Map through the documents to create an array of instructors
        const instructors = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Log the array of instructors
        console.log('Instructors array: \n', instructors);
 
        // Return the array of instructors
        return instructors;
    } catch (error) {
        console.error('Error getting documents: ', error);
        return [];
    }
}

module.exports = { getAllInstructors };