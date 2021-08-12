import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../utils/stripe.utils';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import Laptop from '../images/laptop.png';
import { createOrder, emptyUserCart } from '../utils/user.utils';

const StripeCheckout = () => {
	const dispatch = useDispatch();
	const { user, coupon } = useSelector((state) => ({ ...state }));

	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState('');

	const [cartTotal, setCartTotal] = useState(0);
	const [payable, setPayable] = useState(0);

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		createPaymentIntent(user.token, coupon).then((res) => {
			setClientSecret(res.data.clientSecret);
			setCartTotal(res.data.cartTotal);
			setPayable(res.data.payable);
		});
	}, [coupon, user.token]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);

		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: e.target.name.value
				}
			}
		});

		if (payload.error) {
			setError(`Payment failed ${payload.error.message}`);
			setProcessing(false);
		} else {
			createOrder(payload, user.token).then((res) => {
				if (res.data.ok) {
					if (typeof window !== undefined) localStorage.removeItem('cart');
					dispatch({
						type: 'ADD_TO_CART',
						payload: []
					});
					dispatch({
						type: 'COUPON_APPLIED',
						payload: false
					});
					emptyUserCart(user.token);
				}
			});
			setError(null);
			setProcessing(false);
			setSucceeded(true);
		}
	};

	const handleChange = async (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : '');
	};

	const cartStyle = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#32325d'
				}
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a'
			}
		}
	};

	return (
		<>
			<p className={succeeded ? 'result-message' : 'result-message hidden'}>
				Payment Successful.{' '}
				<Link to='/user/history'>See it in your purchase history.</Link>
			</p>
			<div className='text-center pb-5'>
				<Card
					cover={
						<img
							src={Laptop}
							alt='Laptop'
							style={{
								height: '200px',
								objectFit: 'cover',
								marginBottom: '-50px'
							}}
						/>
					}
					actions={[
						<>
							<DollarOutlined className='text-info' /> <br /> Total: $
							{cartTotal}
						</>,
						<>
							<CheckOutlined className='text-info' /> <br /> Total payable : $
							{(payable / 100).toFixed(2)}
						</>
					]}
				/>
			</div>
			<form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
				<CardElement
					id='card-element'
					options={cartStyle}
					onChange={handleChange}
				/>
				<button
					className='stripe-button mb-4'
					disabled={processing || disabled || succeeded}
				>
					<span id='button-text'>
						{processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
					</span>
				</button>
				{error && (
					<div className='card-error' role='alert'>
						{error}
					</div>
				)}
			</form>
		</>
	);
};

export default StripeCheckout;
