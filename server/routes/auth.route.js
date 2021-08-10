const express = require('express');
const router = express.Router();
const {
	createOrUpdateUser,
	currentUser
} = require('../controllers/auth.controller');
const { authCheck, adminCheck } = require('../middlewares/auth.middleware');

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;
