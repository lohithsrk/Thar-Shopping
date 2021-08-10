import React from 'react';

import Jumbotron from '../components/cards/Jumbotron.component';
import NewArrivals from '../components/home/New-arivals.component';
import BestSeller from '../components/home/Best-seller.component';
import CategoryList from '../components/category/Category-list.component';
import SubList from '../components/sub/Sub-list.component';

const Homepage = () => {
	return (
		<div>
			<div className='h-48 -mt-6 mb-6 flex items-center justify-around bg-gray-300 text-4xl text-red-600 font-bold'>
				<Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
			</div>

			<h4 className='text-center p-3 mt-5 mb-5 text-4xl font-normal bg-gray-300'>
				New Arrivals
			</h4>
			<NewArrivals />
			<h4 className='text-center p-3 mt-5 mb-5 text-4xl font-normal bg-gray-300'>
				Best Seller
			</h4>
			<BestSeller />
			<h4 className='text-center p-3 mt-5 mb-5 text-4xl font-normal bg-gray-300'>
				Categories
			</h4>
			<CategoryList />
			<h4 className='text-center p-3 mt-5 mb-5 text-4xl font-normal bg-gray-300'>
				Sub Categories
			</h4>
			<SubList />
		</div>
	);
};

export default Homepage;
