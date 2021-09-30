import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import WhoIsApp from './WhoIsApp';
import store from './Store/index';

ReactDOM.render(
	<Provider store={store}>
		<WhoIsApp />
	</Provider>,
	document.getElementById('root')
);
