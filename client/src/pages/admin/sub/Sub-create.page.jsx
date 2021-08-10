import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';

import { createSub, getSubs, removeSub } from '../../../utils/sub.utils';
import { getCategories } from '../../../utils/category.utils';
import AdminNav from '../../../components/nav/Admin-nav.component';
import CategoryForm from '../../../components/forms/Category-form.component';
import LocalSearch from '../../../components/forms/Local-search.component';

const SubCreate = () => {
	const { user } = useSelector((state) => ({ ...state }));

	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState('');
	const [subs, setSubs] = useState([]);
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		loadCategories();
		loadSubs();
	}, []);

	const loadCategories = () =>
		getCategories().then((c) => setCategories(c.data));

	const loadSubs = () => getSubs().then((s) => setSubs(s.data));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createSub({ name, parent: category }, user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				loadSubs();
				toast.success(`"${res.data.name}" is created`);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	const handleRemove = async (slug) => {
		if (window.confirm('Delete?')) {
			setLoading(true);
			removeSub(slug, user.token)
				.then((res) => {
					setLoading(false);
					loadSubs();
					toast.error(`${res.data.name} deleted`);
				})
				.catch((err) => {
					if (err.response.status === 400) {
						setLoading(false);
						toast.error(err.response.data);
					}
				});
		}
	};

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-5 offset-md-2'>
					<h4>
						Create Sub category
						{loading ? (
							<LoadingOutlined className='text-yellow-500 icon' />
						) : null}
					</h4>

					<div className='form-group'>
						<label className='mb-3'>Parent category</label>
						<select
							name='category'
							className='form-control mb-3'
							onChange={(e) => setCategory(e.target.value)}
							defaultValue='Please Select'
						>
							<option disabled value='Please Select'>
								Please Select
							</option>
							{categories.length > 0 &&
								categories.map((category) => (
									<option key={category._id} value={category._id}>
										{category.name}
									</option>
								))}
						</select>
					</div>

					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>

					<LocalSearch keyword={keyword} setKeyword={setKeyword} />

					{subs.filter(searched(keyword)).map((s) => (
						<div className='alert alert-secondary' key={s._id}>
							{s.name}
							<span
								onClick={() => handleRemove(s.slug)}
								className='btn btn-sm float-end'
							>
								<DeleteOutlined className='text-red-500 icon' />
							</span>
							<Link to={`/admin/sub/${s.slug}`}>
								<span className='btn btn-sm float-end'>
									<EditOutlined className='text-yellow-500 icon' />
								</span>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SubCreate;
