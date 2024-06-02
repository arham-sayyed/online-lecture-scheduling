const path = require('path');
const express = require('express');
const router = express.Router();

const indexControllers = require(path.join(__dirname, '..' , 'controllers', 'indexControllers'));

router.get('/', indexControllers.navigateFromIndex)
router.post('/', indexControllers.login)

module.exports = router