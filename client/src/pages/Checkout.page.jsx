import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUserCart } from '../utils/user.utils';

const Checkout = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);

	const saveAddressToDb = () => {};

	useEffect(() => {
		getUserCart(user.token).then((res) => {
			setProducts(res.data.products);
			setTotal(res.data.cartTotal);
		});
	}, []);

	return (
		<div className='row'>
			<div className='col-md-6'>
				<h4>Delivery Address</h4>
				<br />
				<br />
				textarea
				<button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
					Save
				</button>
				<h4>Got a Coupon ?</h4>
				<br />
				Coupon input and apply button
			</div>
			<div className='col-md-6'>
				<h4>Order Summary</h4>
				<hr />
				<p>Products {products.length}</p>
				<hr />
				{products.map((p,i)=>(
					<div key={i}>
						<p>{p.product.title}</p>
					</div>
				))}
				<hr />
				<p>Cart total: 1x</p>
				<div className='row'>
					<div className='col-md-6'>
						<button className='btn btn-primary'>Place Order</button>
					</div>
					<div className='col-md-6'>
						<button className='btn btn-primary'>Empty Cart</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
