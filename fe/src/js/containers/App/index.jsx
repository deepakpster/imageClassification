// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './styles.scss';

class App extends React.Component {
	render() {
		const { props } = this;
		return props.children;
	}
}

export default withRouter(connect(
	(state, props) => ({
		...props,
		...state
	}),
	(dispatch => ({
	})),
)(App));
