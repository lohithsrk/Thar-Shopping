import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import StarRating from 'react-star-ratings';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import ProductListItems from './ProductListItems.component';
import Laptop from '../../images/laptop.png';
import RatingModal from '../model/Rating-model.component';
import showAverage from '../../utils/rating.utils';

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStartClick, star }) => {
	const { title, images, description, _id } = product;
	const [toolTip, setToolTip] = useState('Click to Add');

	const dispatch = useDispatch();

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
		<div className='row'>
			<div className='col-md-7'>
				{images && images.length ? (
					<Carousel showArrows={true} autoPlay infiniteLoop>
						{images &&
							images.map((image) => (
								<img
									src={image.url}
									key={image.public_id}
									alt={image.public_id}
								/>
							))}
					</Carousel>
				) : (
					<Card
						cover={
							<img src={Laptop} className='mb-3 card-image' alt='Laptop' />
						}
					></Card>
				)}
				<Tabs type='card'>
					<TabPane tab='Description' key={1}>
						{description && description}
					</TabPane>
					<TabPane tab='More' key='2'>
						Call us on xxxxxxxxxx to learn more about this product.
					</TabPane>
				</Tabs>
			</div>
			<div className='col-md-5'>
				<h1 className='bg-info p-3'>{title}</h1>

				{product && product.ratings && product.ratings.length > 0 ? (
					showAverage(product)
				) : (
					<div className='text-center pt-1 pb-3'>No ratings yet</div>
				)}

				<Card
					actions={[
						<Tooltip title={toolTip}>
							<div onClick={handleAddToCart}>
								<ShoppingCartOutlined className='text-red-500' />
								<br />
								Add to Cart
							</div>
						</Tooltip>,
						<Link to='/' className='text-danger'>
							<HeartOutlined />
							<br />
							Add to Wishlist
						</Link>,
						<RatingModal>
							<StarRating
								name={_id}
								numberOfStarts={5}
								rating={star}
								changeRating={onStartClick}
								isSelectable={true}
								starRatedColor='red'
							/>
						</RatingModal>
					]}
				>
					<ProductListItems product={product} />
				</Card>
			</div>
		</div>
	);
};

export default SingleProduct;
