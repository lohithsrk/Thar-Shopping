import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ProductCartIncheckout from '../components/cards/ProductCartIncheckout.component';
import { userCart } from '../utils/user.utils';

const Cart = ({ history }) => {
	const { user, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const getTotal = () => {
		return cart.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0);
	};

	const saveOrderToDb = () => {
		userCart(cart, user.token)
			.then((res) => {
				if (res.data.ok) history.push('/checkout');
			})
			.catch((err) => console.log('Cart save error', err));
	};

	const saveCashOrderToDb = () => {
		dispatch({
			type: 'COD',
			payload: true
		});
		userCart(cart, user.token)
			.then((res) => {
				if (res.data.ok) history.push('/checkout');
			})
			.catch((err) => console.log('Cart save error', err));
	};

	const showCartItems = () => (
		<table className='table table-bordered'>
			<thead className='table-secondary'>
				<tr>
					<th scope='col'>Image</th>
					<th scope='col'>Title</th>
					<th scope='col'>price</th>
					<th scope='col'>Brand</th>
					<th scope='col'>Color</th>
					<th scope='col'>Count</th>
					<th scope='col'>Shipping</th>
					<th scope='col'>Remove</th>
				</tr>
			</thead>
			{cart.map((p) => (
				<ProductCartIncheckout key={p._id} p={p} />
			))}
		</table>
	);

	return (
		<div className='container-fluid pt-2'>
			<div className='row'>
				<div className='row'>
					<div className='col-md-8'>
						<h4>Cart / {cart.length} Products</h4>
						{!cart.length ? (
							<p>
								No products in cart. <Link to='/shop'>Continue Shopping</Link>
							</p>
						) : (
							showCartItems()
						)}
					</div>
					<div className='col-md-4'>
						<h4>Order Summary</h4>
						<hr />
						<p>Products</p>
						{cart.map((c, i) => (
							<div key={i}>
								<p>
									{c.title} x {c.count} = ${c.price * c.count}
								</p>
							</div>
						))}
						<hr />
						Total: <b>${getTotal()}</b>
						<hr />
						{user ? (
							<div>
								<button
									onClick={saveOrderToDb}
									className='btn btn-sm btn-primary mt-2 w-100'
									disabled={!cart.length}
								>
									Proceed to checkout
								</button>
								<br />
								<button
									onClick={saveCashOrderToDb}
									className='btn btn-sm btn-primary mt-2 w-100'
									disabled={!cart.length}
								>
									Pay Cash on Delivery
								</button>
							</div>
						) : (
							<button className='btn btn-sm btn-primary mt-2'>
								<Link
									to={{
										pathname: '/login',
										state: { from: '/cart' }
									}}
									className='text-white'
								>
									Login to checkout
								</Link>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
