import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	EditOutlined,
	DeleteOutlined,
	LoadingOutlined
} from '@ant-design/icons';

import {
	createCategory,
	getCategories,
	removeCategory
} from '../../../utils/category.utils';
import AdminNav from '../../../components/nav/Admin-nav.component';
import CategoryForm from '../../../components/forms/Category-form.component';
import LocalSearch from '../../../components/forms/Local-search.component';

const CategoryCreate = () => {
	const { user } = useSelector((state) => ({ ...state }));

	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = () =>
		getCategories().then((c) => setCategories(c.data));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createCategory({ name }, user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				toast.success(`"${res.data.name}" is created`);
				loadCategories();
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
			removeCategory(slug, user.token)
				.then((res) => {
					setLoading(false);
					toast.error(`${res.data.name} deleted`);
					loadCategories();
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
						Create category
						{loading ? (
							<LoadingOutlined className='text-yellow-500 icon' />
						) : null}
					</h4>

					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>

					<LocalSearch keyword={keyword} setKeyword={setKeyword} />

					{categories.filter(searched(keyword)).map((c) => (
						<div className='alert alert-secondary' key={c._id}>
							{c.name}
							<span
								onClick={() => handleRemove(c.slug)}
								className='btn btn-sm float-end'
							>
								<DeleteOutlined className='text-red-500 icon' />
							</span>
							<Link to={`/admin/category/${c.slug}`}>
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

export default CategoryCreate;
