import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItems = ({ product }) => {
	const { price, category, subs, shipping, color, brand, sold, quantity } =
		product;

	return (
		<div className='list-group'>
			<li className='list-group-item px-4 py-3'>
				Price{' '}
				<span className='float-end'>
					$ {price}
				</span>
			</li>
			{category && (
				<li className='list-group-item px-4 py-3'>
					Category{' '}
					<Link
						to={`/category/${category.slug}`}
						className='float-end'
					>
						{category.name}
					</Link>
				</li>
			)}
			{subs && (
				<li className='list-group-item px-4 py-3'>
					Sub Category
					{subs.map((sub) => (
						<Link
							to={`/sub/${sub.slug}`}
							className='float-end'
							key={sub._id}
						>
							{sub.name}
						</Link>
					))}
				</li>
			)}
			<li className='list-group-item px-4 py-3'>
				Shipping{' '}
				<span className='float-end'>
					{shipping}
				</span>
			</li>
			<li className='list-group-item px-4 py-3'>
				Color{' '}
				<span className='float-end'>
					{color}
				</span>
			</li>
			<li className='list-group-item px-4 py-3'>
				Brand{' '}
				<span className='float-end'>
					{brand}
				</span>
			</li>
			<li className='list-group-item px-4 py-3'>
				Available{' '}
				<span className='float-end'>
					{quantity}
				</span>
			</li>
			<li className='list-group-item px-4 py-3'>
				Sold{' '}
				<span className='float-end'>
					{sold}
				</span>
			</li>
		</div>
	);
};

export default ProductListItems;
