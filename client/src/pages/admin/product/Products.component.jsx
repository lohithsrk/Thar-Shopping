import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import AdminNav from '../../../components/nav/Admin-nav.component';
import {
	getProductsByCount,
	removeProduct
} from '../../../utils/product.utils';
import AdminProductCard from '../../../components/cards/Admin-product.component';

const AllProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const user = useSelector((state) => state.user);

	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = () =>
		getProductsByCount(100)
			.then((res) => {
				setLoading(true);
				setProducts(res.data);
			})
			.catch((err) => setLoading(false));

	const handleRemove = (slug) => {
		if (window.confirm('Delete ?')) {
			removeProduct(slug, user.token)
				.then((res) => {
					loadAllProducts();
					toast.success(`${res.data.title} is deleted`);
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					<h4 className='mb-3'>
						All Products
						{!loading ? (
							<LoadingOutlined className='icon text-red-500' />
						) : null}
					</h4>
					<div className='row'>
						{products.map((product) => (
							<div key={product._id} className='col-md-4 pb-3'>
								<AdminProductCard
									product={product}
									handleRemove={handleRemove}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllProducts;
