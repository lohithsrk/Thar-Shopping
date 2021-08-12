import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import {
	HomeOutlined,
	SettingOutlined,
	UserAddOutlined,
	UserOutlined,
	LogoutOutlined,
	ShoppingOutlined,
	ShoppingCartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../redux/user/user.action';
import Search from '../forms/Search.component';

const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState('home');

	const dispatch = useDispatch();
	const history = useHistory();
	const { user, cart } = useSelector((state) => state);

	const handleClick = (e) => {
		setCurrent(e.key);
	};

	const logoutUser = () => {
		firebase.auth().signOut();
		dispatch(logout());
		history.push('/login');
	};
	return (
		<div className='mb-4'>
			<Menu
				onClick={handleClick}
				selectedKeys={[current]}
				mode='horizontal'
				className='flex items-center'
			>
				<div className='flex me-auto'>
					<Item key='home' icon={<HomeOutlined />} className='me-auto'>
						<Link to='/'>Home</Link>
					</Item>
					<Item key='shop' icon={<ShoppingOutlined />}>
						<Link to='/shop'>Shop</Link>
					</Item>
					<Item key='cart' icon={<ShoppingCartOutlined />}>
						<Link to='/cart'>
							<Badge count={cart.length} offset={[9, 0]}>
								Cart
							</Badge>
						</Link>
					</Item>
				</div>
				{user ? (
					<SubMenu
						key='SubMenu'
						icon={<SettingOutlined />}
						title={user.email && user.email.split('@')[0]}
					>
						{user && user.role === 'subscriber' && (
							<Item key='setting:1'>
								<Link to='/user/history'>Dashboard</Link>
							</Item>
						)}

						{user && user.role === 'admin' && (
							<Item key='setting:1'>
								<Link to='/admin/dashboard'>Dashboard</Link>
							</Item>
						)}
						<Item
							key='setting:3'
							icon={<LogoutOutlined />}
							onClick={logoutUser}
						>
							Logout
						</Item>
					</SubMenu>
				) : (
					<>
						<Item key='login' icon={<UserOutlined />}>
							<Link to='/login'>Login</Link>
						</Item>
						<Item key='register' icon={<UserAddOutlined />}>
							<Link to='/register'>Register</Link>
						</Item>
					</>
				)}
				<span className='p-1'>
					<Search />
				</span>
			</Menu>
		</div>
	);
};

export default Header;
