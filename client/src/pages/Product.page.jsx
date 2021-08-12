import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getProduct } from '../utils/product.utils';
import SingleProduct from '../components/cards/Single-product.component';
import { productStar } from '../utils/product.utils';
import { getRelated } from '../utils/product.utils';
import ProductCard from '../components/cards/Product-card.component';

const Product = ({ match }) => {
	const [product, setProduct] = useState({});
	const [star, setStar] = useState(0);
	const [related, setRelated] = useState([]);

	const { slug } = match.params;

	const user = useSelector((state) => state.user);

	useEffect(() => {
		getProduct(slug).then((res) => {
			setProduct(res.data);
			getRelated(res.data._id).then((res) => setRelated(res.data));
		});
	}, [slug]);

	useEffect(() => {
		if (product.ratings && user) {
			let existingRatingObject = product.ratings.find(
				(ele) => ele.postedBy.toString() === user._id.toString()
			);
			existingRatingObject && setStar(existingRatingObject.star);
		}
	}, [product.ratings, user]);

	const loadSingleProduct = () => {
		getProduct(slug).then((res) => {
			setProduct(res.data);
			getRelated(res.data._id).then((res) => setRelated(res.data));
		});
	};

	const onStartClick = (newRating, name) => {
		setStar(newRating);
		productStar(name, newRating, user.token).then((res) => {
			loadSingleProduct();
		});
	};

	return (
		<div className='container-fluid'>
			<div className='row pt-4'>
				<SingleProduct
					product={product}
					onStartClick={onStartClick}
					star={star}
				/>
			</div>
			<div className='row'>
				<div className='col text-center pt-5 pb-5'>
					<hr />
					Related Products
					<hr />
				</div>
				<div className='row pb-5'>
					{related.length ? (
						related.map((r) => (
							<div key={r._id} className='col-md-4'>
								{<ProductCard product={r} />}
							</div>
						))
					) : (
						<div className='text-center col'>No products found</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Product;
