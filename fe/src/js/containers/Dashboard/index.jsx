// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import DashboardComponenet from '../../components/Dashboard';
import {dashboardActions} from '../../actions';
import styles from './styles.scss';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.props.dashboardActions.loadModel();
	}
	render() {
		const { props } = this;
		return (
			<div className={styles.appPage}>
				<DashboardComponenet {...props} />
			</div>
		);
	}
}

export default withRouter(connect(
	(state, props) => ({
    ...state,
		...props,
	}),
	(dispatch => ({
		dashboardActions: bindActionCreators(dashboardActions, dispatch),
	})),
)(Dashboard));
