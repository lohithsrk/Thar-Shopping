const express = require("express");
const { auth } = require("../firebase");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth.middleware");

const { orders, orderStatus } = require("../controllers/admin.controller");

router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = router;
