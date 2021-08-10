import React, { useState, useEffect } from 'react';

import { getSub } from '../../utils/sub.utils';
import ProductCard from '../../components/cards/Product-card.component';

const SubHome = ({ match }) => {
	const [sub, setSub] = useState({});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const { slug } = match.params;

	useEffect(() => {
		setLoading(true);
		getSub(slug).then((res) => {
			setSub(res.data.subs);
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
							{products.length} Products in "{sub.name}" Sub category
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
export default SubHome;
