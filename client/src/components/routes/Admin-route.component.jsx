import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './Loading-to-redirect.component';
import { currentAdmin } from '../../utils/auth.utils';

const AdminRoute = ({ ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		if (user && user.token) {
			currentAdmin(user.token)
				.then((res) => {
					setAdmin(true);
				})
				.catch((err) => {
					console.log(err);
					setAdmin(false);
				});
		}
	}, [user]);

	return admin ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
