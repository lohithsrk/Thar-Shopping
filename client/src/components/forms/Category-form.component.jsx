import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName }) => (
	<form onSubmit={handleSubmit}>
			<label className='mb-3'>Name</label>
			<input
				type='text'
				className='form-control'
				onChange={(e) => setName(e.target.value)}
				value={name}
				autoFocus
				required
			/>
			<br />
			<button className='btn btn-outline-primary mb-3'>Save</button>
	</form>
);

export default CategoryForm;
