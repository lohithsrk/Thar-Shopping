import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Laptop from '../../images/laptop.png';

const SideDrawer = () => {
	const dispatch = useDispatch();
	const { drawer, cart } = useSelector((state) => ({ ...state }));

	return (
		<Drawer
			visible={drawer}
			onClose={() => {
				dispatch({
					type: 'SET_VISIBLE',
					payload: false
				});
			}}
			className='text-center'
			title={`Cart / ${cart.length} Products`}
		>
			{cart.map((p) => (
				<div className='row' key={p._id}>
					<div className='col'>
						{p.images[0] ? (
							<div>
								<img
									src={p.images[0].url}
									alt='Laptop'
									className='imageStyle'
								/>
								<p className='text-center bg-secondary text-light'>
									{p.title} x {p.count}
								</p>
							</div>
						) : (
							<div>
								<img src={Laptop} alt='Laptop' className='imageStyle' />
								<p className='text-center bg-secondary text-light'>
									{p.title} x {p.count}
								</p>
							</div>
						)}
					</div>
				</div>
			))}
			<Link to='/cart'>
				<button
					className='btn btn-info w-100'
					onClick={() =>
						dispatch({
							type: 'SET_VISIBLE',
							payload: false
						})
					}
				>Go to Cart</button>
			</Link>
		</Drawer>
	);
};

export default SideDrawer;
