const Product = require('../models/products.model');
const mongoose = require('mongoose');
const slugify = require('slugify');

const names = [
	'Amosta',
	'Archos',
	'Billion',
	'Celkon',
	'Chuwi',
	'Condor',
	'Cubot',
	'Datamini',
	'Detel',
	'EcoTel',
	'Exmart'
];

mongoose
	.connect('mongodb+srv://admin:l6Uoe6oaSysLCBtX@cluster0.eu474.mongodb.net/Thar-DB', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true
	})
	.then(() => console.log('DATABASE CONNECTED'))
	.catch((error) => console.log('ERROR IN DATABASE CONNECTION', error));

const newproduct = async (req, res) => {
	try {
		await Product.deleteMany({});
		for (let name of names) {
			const slug = slugify(name);
			const proc = new Product({
				title: name,
				slug: slug,
				description: `Laptop by ${name}`,
				price: '3000',
				category: '',
				subs: '',
				quantity: 100,
				sold: 50,
				images: [
					{
						public_id: 'cptz0f12zfhvbs1iuvxw',
						url: 'https://res.cloudinary.com/dhkncompx/image/upload/v1627827913/cptz0f12zfhvbs1iuvxw.jpg'
					},
					{
						public_id: 'ezxpadvafkcwttvst8av',
						url: 'https://res.cloudinary.com/dhkncompx/image/upload/v1627827916/ezxpadvafkcwttvst8av.jpg'
					},
					{
						public_id: 'bmzzmlzwnftoxpxx5wmx',
						url: 'https://res.cloudinary.com/dhkncompx/image/upload/v1627827916/bmzzmlzwnftoxpxx5wmx.jpg'
					}
				],
				shipping: 'Yes',
				color: 'Silver',
				brand: 'Dell'
			});
			await proc.save();
		}
	} catch (err) {
		console.log(err);
	}
};
newproduct();
