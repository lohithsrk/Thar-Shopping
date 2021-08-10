import React from 'react';

import AdminNav from '../../components/nav/Admin-nav.component';

const AdminDashboard = () => {
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					<h4 className='mb-3'>Admin Dashboard</h4>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
