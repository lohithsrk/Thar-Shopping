import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

import { auth } from './firebase';
import Header from './components/nav/header.component';
import Homepage from './pages/Homepage.page';
import Login from './pages/auth/Login.page';
import Register from './pages/auth/Register.page';
import RegisterComplete from './pages/auth/Register-complete.page';
import ForgotPassword from './pages/auth/Forgot.page';
import History from './pages/user/History.page';
import UserRoute from './components/routes/User-route.component';
import AdminRoute from './components/routes/Admin-route.component';
import Password from './pages/user/Password.page';
import Wishlist from './pages/user/Wishlist.page';
import { currentUser } from './utils/auth.utils';
import AdminDashboard from './pages/admin/Admin-dashboard.page';
import CategoryCreate from './pages/admin/category/Category-create.page';
import CategoryUpdate from './pages/admin/category/Category-update.page';
import SubCreate from './pages/admin/sub/Sub-create.page';
import SubUpdate from './pages/admin/sub/Sub-update.page';
import ProductCreate from './pages/admin/product/Product-create.page';
import AllProducts from './pages/admin/product/Products.component';
import ProductUpdate from './pages/admin/product/Admin-product-update.page';
import Product from './pages/Product.page';
import CategoryHome from './pages/category/Category-home.page';
import SubHome from './pages/sub/Sub-home.page';
import Shop from './pages/Shop.page';
import Cart from './pages/Cart.page';
import './global.styles.css';
import SideDrawer from './components/drawer/sideDrawer.component';
import Checkout from './pages/Checkout.page';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				currentUser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: 'LOGGED_IN_USER',
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id
							}
						});
					})
					.catch((error) => console.log(error));
			}
		});
		return () => unsubscribe();
	}, [dispatch]);

	return (
		<div>
			<Header />
			<SideDrawer />
			<ToastContainer />
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/register/complete' component={RegisterComplete} />
				<Route exact path='/forgot/password' component={ForgotPassword} />
				<UserRoute exact path='/user/history' component={History} />
				<UserRoute exact path='/user/password' component={Password} />
				<UserRoute exact path='/user/wishlist' component={Wishlist} />
				<AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
				<AdminRoute exact path='/admin/category' component={CategoryCreate} />
				<AdminRoute
					exact
					path='/admin/category/:slug'
					component={CategoryUpdate}
				/>
				<AdminRoute exact path='/admin/sub' component={SubCreate} />
				<AdminRoute exact path='/admin/sub/:slug' component={SubUpdate} />
				<AdminRoute exact path='/admin/product' component={ProductCreate} />
				<AdminRoute exact path='/admin/products' component={AllProducts} />
				<AdminRoute
					exact
					path='/admin/product/:slug'
					component={ProductUpdate}
				/>
				<Route exact path='/product/:slug' component={Product} />
				<Route exact path='/category/:slug' component={CategoryHome} />
				<Route exact path='/sub/:slug' component={SubHome} />
				<Route exact path='/shop' component={Shop} />
				<Route exact path='/cart' component={Cart} />
				<Route exact path='/checkout' component={Checkout} />
			</Switch>
		</div>
	);
};

export default App;
