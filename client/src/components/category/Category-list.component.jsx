import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCategories } from '../../utils/category.utils';

const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getCategories().then((res) => {
			setCategories(res.data);
			setLoading(false);
		});
	}, []);

	return (
		<div className='container'>
			<div className='row'>
				{loading ? (
					<h4 className='text-center'>Loading...</h4>
				) : (
					categories.map((category) => (
						<Link
							to={`/category/${category.slug}`}
							className='col'
							key={category._id}
						>
							<div className='btn btn-outline-primary d-block m-3'>
								{category.name}
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
};

export default CategoryList;
