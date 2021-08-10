import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import AdminNav from '../../../components/nav/Admin-nav.component';
import { updateCategory, getCategory } from '../../../utils/category.utils';
import CategoryForm from '../../../components/forms/Category-form.component';

const CategoryUpdate = ({ history, match }) => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);

	const user = useSelector((state) => state.user);

	useEffect(() => {
		getCategory(match.params.slug)
			.then((c) => setName(c.data.name))
			.catch((err) => {
				if (err) {
					toast.error(`${match.params.slug} is not found`);
					history.push('/admin/category');
				}
			});
	}, [history, match]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateCategory(match.params.slug, { name }, user.token)
			.then((res) => {
				setLoading(true);
				setName('');
				toast.success(`${res.data.name} updated`);
				history.push('/admin/category');
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-5 offset-md-2'>
					<h4 className='mb-4'>
						Update Category
						{loading ? (
							<LoadingOutlined className='text-yellow-500 icon' />
						) : null}
					</h4>

					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>
				</div>
			</div>
		</div>
	);
};

export default CategoryUpdate;
