import React from 'react';
import { Space, Card } from 'antd';
import moment, { Moment } from 'moment';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFixture } from '../../redux/actions';

import style from './Match.module.css';

interface MatchProps {
	homeTeam: string
	homeTeamLogo: string
	goalsHome: number
	awayTeam: string
	goalsAway: number
	awayTeamLogo: string
	date: number
	round: string
	isPostponed: number | null
	fixtureID: number
	key: number
}

const Match: React.FC<MatchProps> = (props) => {
	const {
		homeTeam, homeTeamLogo,
		goalsAway, goalsHome,
		awayTeam, awayTeamLogo,
		date, round, isPostponed, fixtureID,
	} = props;
	const dateEvent: Moment = moment.unix(date);
	const dateString: string = dateEvent.format('MMM Do YYYY');
	const roundNo: string = round.replace('Regular Season -', 'Date: ' + dateString + 'Matchday:');
	const dispatch = useDispatch();

	return (
		<Space direction='vertical'>
			<NavLink to={'/details/' + fixtureID}>
				<Card title={roundNo} className={style.item} hoverable onClick={() => dispatch(setFixture(fixtureID))}>
					<div className={style.container}>
						{(!isPostponed && dateEvent < moment()) &&
						<p className={style.postpone}>Match Postponed</p>
						}
						<p>
							<img src={homeTeamLogo} alt={'teamLogo'} className={style.team_logo} />
							{homeTeam}
							<span className={style.score}>{goalsHome}</span>
						</p>
						<p>
							<img src={awayTeamLogo} alt={'teamLogo'} className={style.team_logo} />
							{awayTeam}
							<span className={style.score}>{goalsAway}</span>
						</p>
					</div>
				</Card>
			</NavLink>
		</Space>
	);
};

export default Match;