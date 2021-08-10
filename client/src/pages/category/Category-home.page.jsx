import React, { useState, useEffect } from 'react';

import { getCategory } from '../../utils/category.utils';
import ProductCard from '../../components/cards/Product-card.component';

const CategoryHome = ({ match }) => {
	const [category, setCategory] = useState({});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const { slug } = match.params;

	useEffect(() => {
		setLoading(true);
		getCategory(slug).then((res) => {
			setCategory(res.data.category);
			setProducts(res.data.products);
			setLoading(false);
		});
	}, [slug]);

	return (
		<div className='container'>
			<div className='row'>
				<div className='col'>
					{loading ? (
						<h4 className='text-center p-3 my-5 bg-gray-300 text-4xl'>
							Loading...
						</h4>
					) : products && products.length ? (
						<h4 className='text-center p-3 my-5 bg-gray-300 text-3xl font-normal'>
							{products.length} Products in "{category.name}" Category
						</h4>
					) : (
						'No products found'
					)}
				</div>
				<div className='row'>
					{products.map((product) => (
						<div className='col-md-4 mb-3' key={product._id}>
							<ProductCard product={product} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default CategoryHome;
