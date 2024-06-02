const path = require('path');
const express = require('express');
const router = express.Router();

const adminControllers = require(path.join(__dirname, '..' , 'controllers', 'adminControllers'));

// admin home routes
router.get('/', adminControllers.getAdmin)

// admin view instructors
router.get('/viewInstructors', adminControllers.viewInstructors)

module.exports = router;