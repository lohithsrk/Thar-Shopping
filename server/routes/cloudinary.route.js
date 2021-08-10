const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/auth.middleware');

const { upload, remove } = require('../controllers/cloudinary.controller');

router.post('/uploadImage', authCheck, adminCheck, upload);
router.post('/removeImage', authCheck, adminCheck, remove);

module.exports = router;
