import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import Laptop from '../../images/laptop.png';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
	const { title, description, images, slug } = product;

	return (
		<Card
			cover={
				<img
					src={images && images.length ? images[0].url : Laptop}
					style={{ height: '150px', objectFit: 'cover' }}
					className='p-1'
					alt='Laptop'
				/>
			}
			actions={[
				<Link to={`/admin/product/${slug}`}>
					<EditOutlined className='text-yellow-500' />
				</Link>,
				<DeleteOutlined
					className='text-red-500'
					onClick={() => handleRemove(slug)}
				/>
			]}
		>
			<Meta
				title={title}
				description={`${description && description.substring(0, 40)}...`}
			/>
		</Card>
	);
};

export default AdminProductCard;
