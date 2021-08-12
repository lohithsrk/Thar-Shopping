import axios from 'axios';

export const createPaymentIntent = (authtoken, coupon) =>
	axios.post(
		`localhost:${process.env.PORT}/create-payment-intent`,
		{ couponApplied: coupon },
		{
			headers: {
				authtoken
			}
		}
	);
