import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../utils/auth.utils';

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	useEffect(() => {
		if (user && user.token) history.push('/');
		setEmail(window.localStorage.getItem('emailForRegistration'));
	}, [history, user]);
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email || !password)
			return toast.error('Email and Password is required');

		if (password !== confirmPassword)
			return toast.error('Password does not match');

		if (password.length < 6)
			return toast.error('Password must be atleast 6 characters long');

		try {
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href
			);
			if (result.user.emailVerified) {
				window.localStorage.removeItem('emailForRegistration');
				let user = auth.currentUser;
			await user.updatePassword(password);
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
					})
					.catch((error) => console.log(error));
				history.push('/');
			}
		} catch (error) {
			return toast.error(error.message);
		}
	};
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4 className='mb-4'>COMPLETE REGISTRATION</h4>
					<form onSubmit={handleSubmit}>
						<input
							className='form-control mb-4'
							type='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email'
							disabled
						/>

						<input
							className='form-control mb-4'
							type='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Password'
							autoFocus
						/>

						<input
							className='form-control mb-4'
							type='password'
							name='confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder='Confirm Password'
						/>
						<button className='btn btn-success' type='submit'>
							Complete registration
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
