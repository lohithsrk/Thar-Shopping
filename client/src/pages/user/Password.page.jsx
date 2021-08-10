import React, { useState } from 'react';
import UserNav from '../../components/nav/user-nav.component';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

const Password = () => {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		await auth.currentUser
			.updatePassword(password)
			.then(() => {
				setLoading(true);
				setPassword('');
				toast.success('Password Updated');
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			});
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<UserNav />
				</div>
				<div className='col-md-5 offset-md-2'>
					<h4 className='mb-4 mt-4'>
						Password Update
						{loading ? (
							<LoadingOutlined className='text-yellow-500 icon' />
						) : null}
					</h4>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label className='mb-3'>Your Password</label>
							<input
								type='password'
								name='password'
								value={password}
								className='form-control mb-3'
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Enter New Password'
								disabled={loading}
							/>
							<button
								className='btn btn-primary'
								disabled={!password || password.length < 6 || loading}
							>
								submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Password;
