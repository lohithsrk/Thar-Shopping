import axios from 'axios';

export const userCart = async (cart, authtoken) =>
	await axios.post(
		`localhost:${process.env.PORT}/user/cart`,
		{ cart },
		{
			headers: {
				authtoken
			}
		}
	);

export const getUserCart = async (authtoken) =>
	await axios.get(`localhost:${process.env.PORT}/user/cart`, {
		headers: {
			authtoken
		}
	});

export const emptyUserCart = async (authtoken) =>
	await axios.delete(`localhost:${process.env.PORT}/user/cart`, {
		headers: {
			authtoken
		}
	});

export const saveUserAddress = async (authtoken, address) =>
	await axios.post(
		`localhost:${process.env.PORT}/user/address`,
		{ address },
		{
			headers: {
				authtoken
			}
		}
	);

export const applyCoupon = async (authtoken, coupon) =>
	await axios.post(
		`localhost:${process.env.PORT}/user/cart/coupon`,
		{ coupon },
		{
			headers: {
				authtoken
			}
		}
	);

export const createOrder = async (stripeResponse, authtoken) =>
	await axios.post(
		`localhost:${process.env.PORT}/user/order`,
		{ stripeResponse },
		{
			headers: {
				authtoken
			}
		}
	);

export const getUserOrders = async (authtoken) =>
	await axios.get(`localhost:${process.env.PORT}/user/orders`, {
		headers: {
			authtoken
		}
	});

export const getWishlist = async (authtoken) =>
	await axios.get(`localhost:${process.env.PORT}/user/wishlist`, {
		headers: {
			authtoken
		}
	});

export const removeWishlist = async (productId, authtoken) =>
	await axios.put(
		`localhost:${process.env.PORT}/user/wishlist/${productId}`,
		{},
		{
			headers: {
				authtoken
			}
		}
	);

export const addToWishlist = async (productId, authtoken) =>
	await axios.post(
		`localhost:${process.env.PORT}/user/wishlist`,
		{ productId },
		{
			headers: {
				authtoken
			}
		}
	);

export const createCashOrderForUser = async (authtoken, COD, coupon) =>
	await axios.post(
		`localhost:${process.env.PORT}/user/cash-order`,
		{ COD, couponApplied: coupon },
		{
			headers: {
				authtoken
			}
		}
	);
