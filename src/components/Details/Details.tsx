import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AppStateType } from '../../redux/rootReducer';
import { setFeaturedResults, setFixture, setFixtureID } from '../../redux/actions';
import Preloader from '../common/Preloader/Preloader';
import MatchDetail from './MatchDetail/MatchDetail';
import Return from '../common/Return-button/Return';
import moment from 'moment';
import { Layout } from 'antd';
import { IDetails, IMatches } from '../../api/types/type';

import style from './Details.module.css';

const { Header } = Layout;

const DetailsWithRouter: React.FC<any> = (props) => {
	const fixtureDetails = useSelector((state: AppStateType) => state.details.fixture);
	const fixtureDate = useSelector<AppStateType, string>((state: AppStateType) => state.details.eventDate);
	const results = useSelector<AppStateType, IMatches[]>((state) => state.results.matches);
	const dispatch = useDispatch();
	const fixID: number = props.location.pathname.replace('/Details/', '');
	const setFixtureData = (id: number) => {
		dispatch(setFixture(id));
	};
	if (!fixtureDetails.event_date) {
		setFixtureData(fixID);
	}

	useEffect(() => {
		dispatch(setFixtureID(fixID));
		// @ts-ignore
		dispatch(setFeaturedResults(results.filter((item: IDetails) =>
			moment.unix(item.event_timestamp).format('MMM Do YYYY') === fixtureDate)));
	}, [results]);

	return (
		<div className={style.page}>
			<Header className={style.head}>
				<Return />
			</Header>
			<div className={style.container}>
				{fixtureDetails.event_date ? <MatchDetail /> : <Preloader />}
			</div>
		</div>
	);
};

const MatchDetails = withRouter(DetailsWithRouter);

export default MatchDetails;