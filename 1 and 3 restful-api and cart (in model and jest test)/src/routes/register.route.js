const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register.controller');


router.post('/', registerController.register);

router.get('/:id/token', registerController.getToken);

router.post('/:id/change_password', registerController.changePassword);

module.exports = router;