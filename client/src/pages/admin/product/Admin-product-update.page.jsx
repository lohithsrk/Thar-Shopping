import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/Admin-nav.component';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../utils/product.utils';
import { getCategories } from '../../../utils/category.utils';
import { getCategorySubs } from '../../../utils/sub.utils';
import FileUpload from '../../../components/forms/File-upload.component';
import { LoadingOutlined } from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/product/Product-update-form.component';

const initialState = {
	title: '',
	description: '',
	price: '',
	category: '',
	subs: [],
	shipping: '',
	quantity: '',
	images: [],
	colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
	brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
	color: '',
	brand: ''
};

const ProductUpdate = ({ match, history }) => {
	const [values, setValues] = useState(initialState);
	const [categories, setCategories] = useState([]);
	const [subOptions, setSubOptions] = useState([]);
	const [arrayOfSubs, setArrayOfSubs] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));
	const { slug } = match.params;

	useEffect(() => {
		loadProduct();
		loadCategories();
	}, []);

	const loadProduct = () => {
		getProduct(slug).then((p) => {
			setValues({ ...values, ...p.data });
			getCategorySubs(p.data.category._id).then((res) => {
				setSubOptions(res.data);
			});
			let arr = [];
			p.data.subs.map((s) => arr.push(s._id));
			console.log('ARR', arr);
			setArrayOfSubs((prev) => arr);
		});
	};

	const loadCategories = () =>
		getCategories().then((c) => {
			setCategories(c.data);
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		values.subs = arrayOfSubs;
		values.category = selectedCategory ? selectedCategory : values.category;

		updateProduct(slug, values, user.token)
			.then((res) => {
				setLoading(false);
				toast.success(`"${res.data.title}" is updated`);
				history.push('/admin/products');
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				toast.error(err.response.data.err);
			});
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleCategoryChange = (e) => {
		e.preventDefault();
		setValues({ ...values, subs: [] });

		setSelectedCategory(e.target.value);

		getCategorySubs(e.target.value).then((res) => {
			setSubOptions(res.data);
		});

		if (values.category._id === e.target.value) {
			loadProduct();
		}
		setArrayOfSubs([]);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>

				<div className='col-md-10'>
					{loading ? (
						<LoadingOutlined className='text-red-500 h1' />
					) : (
						<h4>Product update</h4>
					)}

					<div className='p-3'>
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>

					<ProductUpdateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						setValues={setValues}
						values={values}
						handleCategoryChange={handleCategoryChange}
						categories={categories}
						subOptions={subOptions}
						arrayOfSubs={arrayOfSubs}
						setArrayOfSubs={setArrayOfSubs}
						selectedCategory={selectedCategory}
					/>
					<hr />
				</div>
			</div>
		</div>
	);
};

export default ProductUpdate;
