import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const config = {
			url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
			handleCodeInApp: true
		};

		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail('');
				setLoading(false);
				toast.success('Check your email for password reset link');
			})
			.catch((error) => {
				setLoading(false);
				toast.error(error.message);
			});
	};
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4 className='mb-4'>
						FORGOT PASSWORD
						{loading ? (
							<LoadingOutlined className='text-yellow-500 icon' />
						) : null}
					</h4>
					<form onSubmit={handleSubmit}>
						<input
							type='email'
							className='form-control mb-4'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email'
							autoFocus
						/>
						<button className='btn btn-info' disabled={!email}>
							Send email
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
