import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import Laptop from '../../images/laptop.png';
import showAverage from '../../utils/rating.utils';

const { Meta } = Card;

const ProductCard = ({ product }) => {
	const { title, description, slug, images, price } = product;

	const dispatch = useDispatch();
	const { user, cart } = useSelector((state) => ({ ...state }));

	const [toolTip, setToolTip] = useState('Click to Add');

	const handleAddToCart = () => {
		let cart = [];
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.push({
				...product,
				count: 1
			});
			let unique = _.uniqWith(cart, _.isEqual);
			localStorage.setItem('cart', JSON.stringify(unique));
			setToolTip('Added');
			dispatch({
				type: 'ADD_TO_CART',
				payload: unique
			});
			dispatch({
				type: 'SET_VISIBLE',
				payload: true
			});
		}

	};

	return (
		<div>
			{product && product.ratings && product.ratings.length > 0 ? (
				showAverage(product)
			) : (
				<div className='text-center pt-1 pb-3'>No ratings yet</div>
			)}
			<Card
				cover={
					<img
						src={images && images.length ? images[0].url : Laptop}
						style={{ height: '150px', objectFit: 'cover' }}
						className='p-1'
						alt='Laptop'
					/>
				}
				actions={[
					<Link to={`/product/${slug}`}>
						<EyeOutlined className='text-yellow-500' />
						<br />
						View Product
					</Link>,
					<Tooltip title={toolTip}>
						<div onClick={handleAddToCart}>
							<ShoppingCartOutlined className='text-red-500' />
							<br />
							Add to Cart
						</div>
					</Tooltip>
				]}
			>
				<Meta
					title={`${title} - $${price}`}
					description={`${description && description.substring(0, 40)}...`}
				/>
			</Card>
		</div>
	);
};

export default ProductCard;
