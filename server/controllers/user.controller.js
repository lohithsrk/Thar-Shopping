const User = require('../models/user.model');
const Product = require('../models/products.model');
const Cart = require('../models/cart.model');

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
		object.price = await Product.findById(cart[i]._id).select('price').exec();

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
	const user = await findOne({ email: req.user.email }).exec();
	const cart = await Cart.findOne({ orderBy: user._id })
		.populate('products.product', '_id title price totalAfterDiscount')
		.exec();

	const { products, cartTotal, totalAfterDiscount } = cart;
	res.json({ products, cartTotal, totalAfterDiscount });
};
