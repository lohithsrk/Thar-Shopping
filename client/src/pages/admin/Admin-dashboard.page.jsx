import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/Admin-nav.component';
import { getOrders, changeStatus } from '../../utils/admin.utils';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Orders from '../../components/order/Orders.component';

const AdminDashboard = () => {
	const [orders, setOrders] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		getOrders(user.token).then((res) => {
			setOrders(res.data);
		});
	}, [user.token]);

	const loadOrders = () =>
		getOrders(user.token).then((res) => {
			setOrders(res.data);
		});

	const handleStatusChange = (orderId, orderStatus) => {
		changeStatus(orderId, orderStatus, user.token).then((res) => {
			toast.success('Status updated');
			loadOrders();
		});
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>

				<div className='col-md-10'>
					<h4>Admin Dashboard</h4>
					{/* {JSON.stringify(orders)} */}
					<Orders orders={orders} handleStatusChange={handleStatusChange} />
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
