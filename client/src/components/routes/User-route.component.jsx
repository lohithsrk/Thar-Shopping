import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './Loading-to-redirect.component';

const UserRoute = ({ ...rest }) => {
	const user = useSelector((state) => ({ ...state }));
	return user ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
