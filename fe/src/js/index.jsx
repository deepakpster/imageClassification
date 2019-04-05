// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import 'bootstrap';
import { store, history } from './store';
import App from './containers/App';
import Dashboard from './containers/Dashboard';
import '../scss/main.scss';

import appConfig from './config';

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App>
				<Switch>
					<Route path="/" component={Dashboard} />
				</Switch>
			</App>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app'),
);
