import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import { createProduct } from '../../../utils/product.utils';
import AdminNav from '../../../components/nav/Admin-nav.component';
import ProductCreateForm from '../../../components/forms/product/Product-create-form.component';
import { getCategories } from '../../../utils/category.utils';
import { getCategorySubs } from '../../../utils/sub.utils';
import FileUpload from '../../../components/forms/File-upload.component';

const initialState = {
	title: '',
	description: '',
	price: '',
	categories: [],
	category: '',
	subs: [],
	shipping: '',
	quantity: '',
	images: [],
	colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
	brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus', 'Dell'],
	color: '',
	brand: ''
};

const ProductCreate = () => {
	const user = useSelector((state) => state.user);

	const [values, setValues] = useState(initialState);
	const [subOptions, setSubOptions] = useState([]);
	const [showSubs, setShowSubs] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getCategories().then((c) => setValues({ ...values, categories: c.data }));
	}, [values]);

	const handleSubmit = (e) => {
		e.preventDefault();
		createProduct(values, user.token)
			.then((res) => {
				window.alert(`${res.data.title} is created.`);
				window.location.reload();
			})
			.catch((err) => toast.error(err.response.data.err));
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleCategoryChange = (e) => {
		setValues({ ...values, subs: [], category: e.target.value });
		getCategorySubs(e.target.value).then((res) => setSubOptions(res.data));
		setShowSubs(true);
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-5 offset-md-2'>
					<h4 className='mb-4'>
						Product create
						{loading ? (
							<LoadingOutlined className='text-yellow-500 icon' />
						) : null}
					</h4>

					<hr />

					<div className='p-3'>
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>

					<ProductCreateForm
						values={values}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						handleCategoryChange={handleCategoryChange}
						showSubs={showSubs}
						subOptions={subOptions}
						setValues={setValues}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCreate;
