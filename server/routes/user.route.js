const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");
const { userCart, getUserCart } = require("../controllers/user.controller");

router.post("/user/cart", authCheck, userCart)
router.get("/user/cart", authCheck, getUserCart)

module.exports = router;
