import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { currentUser } from './utils/auth.utils';
import { LoadingOutlined } from '@ant-design/icons';
import './global.styles.css';

const Header = lazy(() => import('./components/nav/header.component'));
const Homepage = lazy(() => import('./pages/Homepage.page'));
const Login = lazy(() => import('./pages/auth/Login.page'));
const Register = lazy(() => import('./pages/auth/Register.page'));
const RegisterComplete = lazy(() =>
	import('./pages/auth/Register-complete.page')
);
const ForgotPassword = lazy(() => import('./pages/auth/Forgot.page'));
const History = lazy(() => import('./pages/user/History.page'));
const UserRoute = lazy(() =>
	import('./components/routes/User-route.component')
);
const AdminRoute = lazy(() =>
	import('./components/routes/Admin-route.component')
);
const Password = lazy(() => import('./pages/user/Password.page'));
const Wishlist = lazy(() => import('./pages/user/Wishlist.page'));
const AdminDashboard = lazy(() => import('./pages/admin/Admin-dashboard.page'));
const CategoryCreate = lazy(() =>
	import('./pages/admin/category/Category-create.page')
);
const CategoryUpdate = lazy(() =>
	import('./pages/admin/category/Category-update.page')
);
const SubCreate = lazy(() => import('./pages/admin/sub/Sub-create.page'));
const SubUpdate = lazy(() => import('./pages/admin/sub/Sub-update.page'));
const ProductCreate = lazy(() =>
	import('./pages/admin/product/Product-create.page')
);
const AllProducts = lazy(() =>
	import('./pages/admin/product/Products.component')
);
const ProductUpdate = lazy(() =>
	import('./pages/admin/product/Admin-product-update.page')
);
const Product = lazy(() => import('./pages/Product.page'));
const CategoryHome = lazy(() => import('./pages/category/Category-home.page'));
const SubHome = lazy(() => import('./pages/sub/Sub-home.page'));
const Shop = lazy(() => import('./pages/Shop.page'));
const Cart = lazy(() => import('./pages/Cart.page'));
const SideDrawer = lazy(() =>
	import('./components/drawer/sideDrawer.component')
);
const Checkout = lazy(() => import('./pages/Checkout.page'));
const CreateCouponPage = lazy(() =>
	import('./pages/admin/coupon/create-coupon.page')
);
const PaymentPage = lazy(() => import('./pages/Payment.page'));

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
		<Suspense
			fallback={
				<div className='col text-center p-5'>
					Thar Sh
					<LoadingOutlined /> pping
				</div>
			}
		>
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
				<UserRoute exact path='/payment' component={PaymentPage} />
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
				<AdminRoute exact path='/admin/coupon' component={CreateCouponPage} />
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
		</Suspense>
	);
};

export default App;
