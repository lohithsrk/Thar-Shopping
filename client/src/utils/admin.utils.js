import axios from 'axios';

export const getOrders = async (authtoken) =>
	await axios.get(`localhost:${process.env.PORT}/admin/orders`, {
		headers: {
			authtoken
		}
	});

export const changeStatus = async (orderId, orderStatus, authtoken) =>
	await axios.put(
		`localhost:${process.env.PORT}/admin/order-status`,
		{ orderId, orderStatus },
		{
			headers: {
				authtoken
			}
		}
	);
