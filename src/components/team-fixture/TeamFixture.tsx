import React, { useEffect } from 'react';
import { Card, Layout } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamFixture, setFixture } from '../../redux/actions';
import { IDetails, ITable } from '../common/types/Type';
import { AppStateType } from '../../redux/rootReducer';
import cn from 'classnames';
import Return from '../common/return-button/Return';

import style from './TeamFixture.module.css';

const { Header } = Layout;

const Fixture: React.FC<any> = (props) => {
	const teamID: number = props.location.pathname.replace('/team/', '');
	const dispatch = useDispatch();
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
						<NavLink to={'/team/' + item.team_id} key={i}>
							<div className={style.table}>
								<div className={cn({ [style.active]: item.teamName === teamName })}>
									<img src={item.logo} alt={'teamLogo'} className={style.icon} />
									<span>{item.teamName}</span>
								</div>
								{item.points}
							</div>
						</NavLink>,
					)}
				</Card>

				<Card
					title={'Last fixtures for ' + teamName}
					className={style.card}>
					{team.map((item, i: number) =>
						<NavLink to={'/details/' + item.fixture_id} key={i}>
							<Card className={style.featured} hoverable
								  onClick={() => setFixtureData(item.fixture_id)}>
								<p className={style.info}>
									<img src={item.homeTeam.logo} alt={'teamLogo'} className={style.logo} />
									<span>{item.homeTeam.team_name} {item.goalsHomeTeam} - </span>
									<span>{item.goalsAwayTeam} {item.awayTeam.team_name}</span>
									<img src={item.awayTeam.logo} alt={'teamLogo'} className={style.logo} />
								</p>
							</Card>
						</NavLink>,
					)}
				</Card>
			</div>
		</div>
	);
};

const TeamFixture = withRouter(Fixture);

export default TeamFixture;