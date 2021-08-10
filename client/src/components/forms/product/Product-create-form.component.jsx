import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const ProductCreateForm = ({
	values,
	handleChange,
	handleSubmit,
	handleCategoryChange,
	showSubs,
	subOptions,
	setValues
}) => {
	const {
		title,
		description,
		price,
		subs,
		colors,
		brands,
		quantity,
		categories
	} = values;
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label className='mb-3'>Title</label>
				<input
					type='text'
					name='title'
					className='form-control mb-3'
					value={title}
					onChange={handleChange}
					autoFocus
				/>
			</div>
			<div className='form-group'>
				<label className='mb-3'>Description</label>
				<input
					type='text'
					name='description'
					className='form-control mb-3'
					value={description}
					onChange={handleChange}
				/>
			</div>
			<div className='form-group'>
				<label className='mb-3'>Price</label>
				<input
					type='number'
					name='price'
					className='form-control mb-3'
					value={price}
					onChange={handleChange}
				/>
			</div>
			<div className='form-group'>
				<label className='mb-3'>Shipping</label>
				<select
					name='shipping'
					className='form-control mb-3'
					onChange={handleChange}
					defaultValue='Please Select'
				>
					<option value='Please Select' disabled>
						Please Select
					</option>
					<option value='Yes'>Yes</option>
					<option value='No'>No</option>
				</select>
			</div>
			<div className='form-group'>
				<label className='mb-3'>Quantity</label>
				<input
					type='number'
					name='quantity'
					className='form-control mb-3'
					value={quantity}
					onChange={handleChange}
				/>
			</div>
			<div className='form-group'>
				<label className='mb-3'>Color</label>
				<select
					name='color'
					className='form-control mb-3'
					onChange={handleChange}
					defaultValue='Please Select'
				>
					<option disabled value='Please Select'>
						Please Select
					</option>
					{colors.map((color) => (
						<option key={color} value={color}>
							{color}
						</option>
					))}
				</select>
			</div>
			<div className='form-group'>
				<label className='mb-3'>Brand</label>
				<select
					name='brand'
					className='form-control mb-3'
					onChange={handleChange}
					defaultValue='Please Select'
				>
					<option disabled value='Please Select'>
						Please Select
					</option>
					{brands.map((brand) => (
						<option key={brand} value={brand}>
							{brand}
						</option>
					))}
				</select>
			</div>
			<div className='form-group'>
				<label className='mb-3'>Category</label>
				<select
					name='category'
					className='form-control mb-3'
					onChange={handleCategoryChange}
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
			{showSubs && (
				<div className='form-group'>
					<label className='mb-3'>Sub categories</label>
					<Select
						className='mb-3'
						mode='multiple'
						style={{ width: '100%' }}
						placeholder='Plaese Select'
						name='subs'
						value={subs}
						onChange={(value) => setValues({ ...values, subs: value })}
					>
						{subOptions.length &&
							subOptions.map((sub) => (
								<Option value={sub._id} key={sub._id}>
									{sub.name}
								</Option>
							))}
					</Select>
				</div>
			)}
			<button className='btn btn-outline-info mb-5'>Save</button>
		</form>
	);
};

export default ProductCreateForm;
