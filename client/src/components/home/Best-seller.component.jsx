import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import { getProducts, getProductsCount } from '../../utils/product.utils';
import ProductCard from '../cards/Product-card.component';
import LoadingCard from '../cards/Loading-card.component';

const BestSeller = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [productsCount, setProductsCount] = useState(1);

	useEffect(() => {
		setLoading(true);
		getProducts('sold', 'desc', page).then((res) => {
			setProducts(res.data);
			setLoading(false);
		});
	}, [page]);

	useEffect(() => {
		getProductsCount().then((res) => setProductsCount(res.data));
	}, []);

	return (
		<div>
			<div className='container'>
				{loading ? (
					<LoadingCard count={3} />
				) : (
					<div className='row'>
						{products.map((product) => (
							<div className='col-md-4' key={product._id}>
								<ProductCard product={product} />
							</div>
						))}
					</div>
				)}
			</div>
				<div className='col-md-4 offset-md-4 p-4 text-center'>
					<Pagination
						current={page}
						total={(productsCount / 3) * 10}
						onChange={(value) => setPage(value)}
					/>
				</div>
		</div>
	);
};

export default BestSeller;
