import React from 'react';
import ModalImage from 'react-modal-image';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	CloseOutlined
} from '@ant-design/icons';

import Laptop from '../../images/laptop.png';

const ProductCartIncheckout = ({ p }) => {
	const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];

	const dispatch = useDispatch();

	const handleColorChange = (e) => {
		let cart = [];
		if (typeof window !== undefined) {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((product, index) => {
				if (product._id === p._id) {
					cart[index].color = e.target.value;
				}
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart
			});
		}
	};

	const handleQuantityChange = (e) => {
		let count = e.target.value < 1 ? 1 : e.target.value;

		if (count > p.quantity) {
			toast.error(`Max available quantity: ${p.quantity}`);
			return;
		}

		let cart = [];
		if (typeof window !== undefined) {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((product, index) => {
				if (product._id === p._id) {
					cart[index].count = count;
				}
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart
			});
		}
	};

	const handleRemove = () => {
		let cart = [];
		if (typeof window !== undefined) {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((product, index) => {
				if (product._id === p._id) {
					cart.splice(index, 1);
				}
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart
			});
		}
	};

	return (
		<tbody>
			<tr className=''>
				<td className='w-2/12'>
					<div>
						{p.images.length ? (
							<ModalImage small={p.images[0].url} large={p.images[0].url} />
						) : (
							<ModalImage small={Laptop} large={Laptop} />
						)}
					</div>
				</td>
				<td>{p.title}</td>
				<td>{p.price}</td>
				<td>{p.brand}</td>
				<td>
					<select
						onChange={handleColorChange}
						name='color'
						className='form-control'
					>
						{p.color ? (
							<option value={p.color}>{p.color}</option>
						) : (
							<option>Select</option>
						)}
						{colors
							.filter((c) => c !== p.color)
							.map((color) => (
								<option key={color} value={color}>
									{color}
								</option>
							))}
					</select>
				</td>
				<td>
					<input
						type='number'
						className='text-center'
						name='count'
						value={p.count}
						onChange={handleQuantityChange}
						min={1}
						max={p.quantity}
					/>
				</td>
				<td className='text-center'>
					{p.shipping ? (
						<CheckCircleOutlined className='text-success' />
					) : (
						<CloseCircleOutlined className='text-danger' />
					)}
				</td>
				<td className='text-center'>
					<CloseOutlined
						onClick={handleRemove}
						className='text-danger pointer'
					/>
				</td>
			</tr>
		</tbody>
	);
};

export default ProductCartIncheckout;
