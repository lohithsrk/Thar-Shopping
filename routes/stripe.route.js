const express = require('express');
const router = express.Router();

const { createPaymentIntent } = require('../controllers/stripe.controller');
const { route } = require('./user.route');

const { authCheck } = require('../middlewares/auth.middleware');

router.post('/create-payment-intent', authCheck, createPaymentIntent);

module.exports = router;