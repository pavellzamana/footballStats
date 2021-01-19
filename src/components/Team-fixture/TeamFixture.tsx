import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Card, Layout } from 'antd';
import cn from 'classnames';
import Return from '../common/Return-button/Return';
import { getTeamFixture, setFixture } from '../../redux/actions';
import { AppStateType } from '../../redux/rootReducer';
import { IDetails, ITable } from '../../api/types/type';

import style from './TeamFixture.module.css';

const { Header } = Layout;

const Fixture: React.FC = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();
	const teamID: number = +location.pathname.replace('/team/', '');
	const team = useSelector<AppStateType, IDetails[]>((state) => state.team.teamFixtures);
	const teamName = useSelector<AppStateType, string>((state) => state.team.teamName);
	const table = useSelector<AppStateType, ITable[]>(state => state.team.table);
	const setFixtureData = (id: number) => {
		dispatch(setFixture(id));
	};

	useEffect(() => {
		dispatch(getTeamFixture(teamID));
	}, [teamID]);

	return (
		<div>
			<Header className={style.head}>
				<Return />
			</Header>
			<div className={style.container}>
				<Card title='League Standings' className={style.card}>
					{table.map((item, i: number) =>
						<div className={style.table} key={i} onClick={() => history.push('/team/' + item.team_id)}>
							<div className={cn({ [style.active]: item.teamName === teamName })}>
								<img src={item.logo} alt='teamLogo' className={style.icon} />
								<span>{item.teamName}</span>
							</div>
							{item.points}
						</div>,
					)}
				</Card>

				<Card
					title={'Last fixtures for ' + teamName}
					className={style.card}>
					{team.map((item, i: number) =>
						<Card className={style.featured} hoverable key={i}
							  onClick={() => {
								  history.push('/Details/' + item.fixture_id);
								  setFixtureData(item.fixture_id);
							  }}>
							<p className={style.info}>
								<img src={item.homeTeam.logo} alt='teamLogo' className={style.logo} />
								<span>{item.homeTeam.team_name} {item.goalsHomeTeam} - </span>
								<span>{item.goalsAwayTeam} {item.awayTeam.team_name}</span>
								<img src={item.awayTeam.logo} alt='teamLogo' className={style.logo} />
							</p>
						</Card>,
					)}
				</Card>
			</div>
		</div>
	);
};


export default Fixture;