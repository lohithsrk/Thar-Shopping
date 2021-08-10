import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

import { Provider } from 'react-redux';
import store from '../src/redux/store'

import App from './App';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider >,
	document.getElementById('root')
);
