const Coupon = require('../models/coupon.model');

exports.create = async (req, res) => {
	try {
		res.json(await new Coupon({...req.body.coupon}).save());
	} catch (err) {
		console.log(err);
	}
};

exports.list = async (req, res) => {
	try {
		res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
	} catch (err) {
		console.log(err);
	}
};

exports.remove = async (req, res) => {
	try {
		res.json(
			await Coupon.findByIdAndDelete({ _id: req.params.couponId }).exec()
		);
	} catch (err) {
		console.log(err);
	}
};
