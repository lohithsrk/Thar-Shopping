import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router';

const RatingModal = ({ children }) => {
	const user = useSelector((state) => state.user);
	const [modalVisible, setModelVisible] = useState(false);

	const history = useHistory();
	const { slug } = useParams();

	const handleModel = () => {
		if (user && user.token) {
			setModelVisible(true);
		} else {
			history.push({
				pathname: '/login',
				state: { from: `/product/${slug}` }
			});
		}
	};

	return (
		<div>
			<div onClick={handleModel} className='text-yellow-500'>
				<StarOutlined className='text-red-500' />
				<br />
				{user ? 'Leave rating' : 'Login to leave rating'}
			</div>

			<Modal
				title='Leave your rating'
				centered
				visible={modalVisible}
				onOk={() => {
					setModelVisible(false);
					toast.success('Thanks for your review. It will appear soon.');
				}}
				onCancel={() => setModelVisible(false)}
			>
				{children}
			</Modal>
		</div>
	);
};

export default RatingModal;
