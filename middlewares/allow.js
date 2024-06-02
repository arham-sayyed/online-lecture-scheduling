const path = require('path'); // Import the 'path' module from Node.js

// Since this middleware will be called after jwt-decode middleware,
// we can use req.user and the token will already be verified!!!

/**
 * This function generates a middleware that allows users with the specified role to access the route.
 * @param {string} role - The required role of the user (e.g., 'admin', 'instructor').
 * @returns {function} - Returns an Express middleware function.
 */
function allow(role) {
    /**
     * Middleware to check if the user has the specified role.
     * @param {import('express').Request} req - The request object from Express.
     * @param {import('express').Response} res - The response object from Express.
     * @param {import('express').NextFunction} next - The next function from Express.
     */
    return (req, res, next) => {
        // Check if req.user exists. This should be set by a previous middleware (e.g., jwt-decode)
        if (req.user) {
            if (req.user.role === role) {
                next(); // If the role matches, proceed to the next middleware or route handler
            } else {
                res.status(401).send('Unauthorized'); // If the role doesn't match, render the 'index' view (access denied)
            }
        } else {
            res.redirect('/'); // If no user is found, render the 'index' view (access denied)
        }
    }
}

module.exports = allow; 