import axios from 'axios';

export const getCoupons = async () =>
	await axios.get(`localhost:${process.env.PORT}/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
	await axios.delete(`localhost:${process.env.PORT}/coupon/${couponId}`, {
		headers: { authtoken }
	});

export const createCoupon = async (coupon, authtoken) =>
	await axios.post(
		`localhost:${process.env.PORT}/coupon`,
		{ coupon },
		{
			headers: {
				authtoken
			}
		}
	);
