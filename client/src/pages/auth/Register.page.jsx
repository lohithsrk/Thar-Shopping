import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'

import { auth } from '../../firebase';

const Register = ({history}) => {
	const [email, setEmail] = useState('');
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true
		};

		await auth.sendSignInLinkToEmail(email, config);
		toast.success(
			`Email is sent to ${email}. Click the link to complete your registration`
		);
		await window.localStorage.setItem('emailForRegistration', email);
		setEmail('');
	};
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4 className='mb-4'>REGISTER</h4>
					<form onSubmit={handleSubmit}>
						<input
							className='form-control'
							type='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email'
							autoFocus
						/>
						<button className='btn btn-success mt-4' type='submit'>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
