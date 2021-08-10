const User = require('../models/user.model');
const Product = require('../models/products.model');
const Cart = require('../models/cart.model');
const Coupon = require('../models/coupon.model');

exports.userCart = async (req, res) => {
	const { cart } = req.body;

	let products = [];

	const user = await User.findOne({ email: req.user.email }).exec();

	let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

	if (cartExistByThisUser) {
		cartExistByThisUser.remove();
	}

	for (let i = 0; i < cart.length; i++) {
		let object = {};

		object.product = cart[i]._id;
		object.count = cart[i].count;
		object.color = cart[i].color;
		let productFromDb = await Product.findById(cart[i]._id)
			.select('price')
			.exec();
		object.price = productFromDb.price;

		products.push(object);
	}

	let cartTotal = 0;
	for (let i = 0; i < products.length; i++) {
		cartTotal = cartTotal + products[i].price * products[i].count;
	}

	let newCart = await new Cart({
		products,
		cartTotal,
		orderdBy: user._id
	}).save();

	res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
	const user = await User.findOne({ email: req.user.email }).exec();

	let cart = await Cart.findOne({ orderdBy: user._id })
		.populate('products.product', '_id title price totalAfterDiscount')
		.exec();

	const { products, cartTotal, totalAfterDiscount } = cart;
	res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
	const user = await User.findOne({ email: req.user.email }).exec();

	const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
	res.json(cart);
};

exports.saveAddress = async (req, res) => {
	const userAddress = await User.findOneAndUpdate(
		{ email: req.user.email },
		{ address: req.body.address }
	).exec();

	res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
	const { coupon } = req.body;

	const validCoupon = await Coupon.findOne({ name: coupon }).exec();
	if (validCoupon === null) {
		return res.json({
			err: 'Invalid coupon'
		});
	}

	const user = await User.findOne({ email: req.user.email }).exec();

	let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
		.populate('products.product', '_id title price')
		.exec();

	let totalAfterDiscount = (
		cartTotal -
		(cartTotal * validCoupon.discount) / 100
	).toFixed(2);

	Cart.findOneAndUpdate(
		{ orderdBy: user._id },
		{ totalAfterDiscount },
		{ new: true }
	);

	res.json(totalAfterDiscount);
};
