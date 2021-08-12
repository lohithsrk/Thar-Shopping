const Category = require('../models/category.model');
const Product = require('../models/products.model');
const Sub = require('../models/sub.model');
const slugify = require('slugify');

exports.create = async (req, res) => {
	try {
		const { name } = req.body;
		res.json(await new Category({ name, slug: slugify(name) }).save());
	} catch (err) {
		console.log(err);
		res.status(400).send('Create category failed');
	}
};

exports.list = async (req, res) => {
	res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
	const category = await Category.findOne({ slug: req.params.slug }).exec();
	const products = await Product.find({ category })
		.populate('category')
		.populate('postedBy', '_id name')
		.exec();
	res.json({ category, products });
};

exports.update = async (req, res) => {
	try {
		const { name } = req.body;
		res.json(
			await Category.findOneAndUpdate(
				{ slug: req.params.slug },
				{ name, slug: slugify(name) },
				{ new: true }
			).exec()
		);
	} catch (err) {
		console.log(err);
		res.status(400).send('Category delete failed');
	}
};

exports.remove = async (req, res) => {
	try {
		res.json(await Category.findOneAndDelete({ slug: req.params.slug }).exec());
	} catch (err) {
		console.log(err);
		res.status(400).send('Category delete failed');
	}
};

exports.getSubs = async (req, res) => {
	await Sub.find({ parent: req.params._id }).exec((err, subs) => {
		if (err) console.log(err);
		res.json(subs);
	});
};
