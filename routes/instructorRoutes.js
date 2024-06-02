const path = require('path');
const express = require('express');
const router = express.Router();

const instructorControllers = require(path.join(__dirname, '..' , 'controllers', 'instructorControllers'));

router.get('/', instructorControllers.getInstructor)
// router.post('/', instructorControllers)



module.exports = router