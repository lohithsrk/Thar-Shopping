import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import AdminNav from '../../../components/nav/Admin-nav.component';
import { getCategories } from '../../../utils/category.utils';
import { updateSub, getSub } from '../../../utils/sub.utils';
import CategoryForm from '../../../components/forms/Category-form.component';

const SubUpdate = ({ match, history }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [parent, setParent] = useState('');

	useEffect(() => {
		loadCategories();
		getSub(match.params.slug).then((s) => {
			setName(s.data.name);
			setParent(s.data.parent);
		});
	}, [match]);

	const loadCategories = () =>
		getCategories().then((c) => setCategories(c.data));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateSub(match.params.slug, { name, parent }, user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				toast.success(`"${res.data.name}" is updated`);
				history.push('/admin/sub');
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
				<div className='col'>
					<h4>
						Update sub category
						{loading ? (
							<LoadingOutlined className='text-yellow-500 icon' />
						) : null}
					</h4>

					<div className='form-group'>
						<label>Parent category</label>
						<select
							name='category'
							className='form-control'
							onChange={(e) => setParent(e.target.value)}
							defaultValue='Please Select'
						>
							<option disabled value='Please Select'>
								Please select
							</option>
							{categories.length > 0 &&
								categories.map((c) => (
									<option key={c._id} value={c._id} selected={c._id === parent}>
										{c.name}
									</option>
								))}
						</select>
					</div>

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

export default SubUpdate;
