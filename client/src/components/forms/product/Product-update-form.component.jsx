import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const ProductUpdateForm = ({
	handleSubmit,
	handleChange,
	values,
	handleCategoryChange,
	categories,
	subOptions,
	arrayOfSubs,
	setArrayOfSubs,
	selectedCategory
}) => {
	const {
		title,
		description,
		price,
		category,
		shipping,
		quantity,
		colors,
		brands,
		color,
		brand
	} = values;

	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label className='mb-3 mt-3'>Title</label>
				<input
					type='text'
					name='title'
					className='form-control'
					value={title}
					onChange={handleChange}
				/>
			</div>

			<div className='form-group'>
				<label className='mb-3 mt-3'>Description</label>
				<input
					type='text'
					name='description'
					className='form-control'
					value={description}
					onChange={handleChange}
				/>
			</div>

			<div className='form-group'>
				<label className='mb-3 mt-3'>Price</label>
				<input
					type='number'
					name='price'
					className='form-control'
					value={price}
					onChange={handleChange}
				/>
			</div>

			<div className='form-group'>
				<label className='mb-3 mt-3'>Shipping</label>
				<select
					value={shipping === 'Yes' ? 'Yes' : 'No'}
					name='shipping'
					className='form-control'
					onChange={handleChange}
				>
					<option value='No'>No</option>
					<option value='Yes'>Yes</option>
				</select>
			</div>

			<div className='form-group'>
				<label className='mb-3 mt-3'>Quantity</label>
				<input
					type='number'
					name='quantity'
					className='form-control'
					value={quantity}
					onChange={handleChange}
				/>
			</div>

			<div className='form-group'>
				<label className='mb-3 mt-3'>Color</label>
				<select
					value={color}
					name='color'
					className='form-control'
					onChange={handleChange}
				>
					{colors.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>

			<div className='form-group'>
				<label className='mb-3 mt-3'>Brand</label>
				<select
					value={brand}
					name='brand'
					className='form-control'
					onChange={handleChange}
				>
					{brands.map((b) => (
						<option key={b} value={b}>
							{b}
						</option>
					))}
				</select>
			</div>

			<div className='form-group'>
				<label className='mb-3 mt-3'>Category</label>
				<select
					name='category'
					className='form-control'
					onChange={handleCategoryChange}
					value={selectedCategory ? selectedCategory : category._id}
				>
					{categories.length > 0 &&
						categories.map((c) => (
							<option key={c._id} value={c._id}>
								{c.name}
							</option>
						))}
				</select>
			</div>

			<div>
				<label className='mb-3 mt-3'>Sub Categories</label>
				<Select
					mode='multiple'
					style={{ width: '100%' }}
					placeholder='Please select'
					value={arrayOfSubs}
					onChange={(value) => setArrayOfSubs(value)}
				>
					{subOptions.length &&
						subOptions.map((s) => (
							<Option key={s._id} value={s._id}>
								{s.name}
							</Option>
						))}
				</Select>
			</div>

			<br />
			<button className='btn btn-outline-info'>Save</button>
		</form>
	);
};

export default ProductUpdateForm;
