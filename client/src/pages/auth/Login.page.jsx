import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { createOrUpdateUser } from '../../utils/auth.utils';
import { auth, googleAuthProvider } from '../../firebase';
import { LoadingOutlined } from '@ant-design/icons';

const Login = ({ history }) => {
	const [email, setEmail] = useState('srklohith05@gmail.com');
	const [password, setPassword] = useState('llllll');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	useEffect(() => {
		let intended = history.location.state;
		if (intended) {
			return;
		} else {
			if (user && user.token) history.push('/');
		}
	}, [user, history]);

	const roleBasedRedirect = (res) => {
		let intended = history.location.state;
		if (intended) {
			history.push(intended.from);
		} else {
			if (res.data.role === 'admin') {
				history.push('/admin/dashboard');
			} else {
				history.push('/user/history');
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const result = await auth.signInWithEmailAndPassword(email, password);
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();
			createOrUpdateUser(idTokenResult.token)
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
					roleBasedRedirect(res);
				})
				.catch((error) => console.log(error));
			toast.success('Logged in successfully');
			// history.push('/');
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	const googleLogin = async () => {
		auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				createOrUpdateUser(idTokenResult.token)
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
						roleBasedRedirect(res);
					})
					.catch((error) => console.log(error));
				toast.success('Logged in successfully');
				// history.push('/');
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4 className='mb-4'>
						LOGIN{' '}
						{loading ? (
							<LoadingOutlined className='text-yellow-500 icon' />
						) : null}
					</h4>
					<input
						className='form-control mb-4'
						type='email'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
						autoFocus
					/>
					<input
						className='form-control mb-4'
						type='password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
					/>
					<Button
						className='mb-4'
						onClick={handleSubmit}
						type='primary'
						shape='round'
						size='large'
						disabled={!email || password.length < 6}
						block
						icon={<MailOutlined className='icon' />}
					>
						Login with Email / Password
					</Button>
					<Button
						className='mb-4'
						onClick={googleLogin}
						type='danger'
						shape='round'
						size='large'
						block
					>
						<GoogleOutlined className='icon' />
						Login with Google
					</Button>
					<div className='d-flex justify-content-end'>
						<Link to='/forgot/password' className='text-red-500'>
							Forgot Password
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
