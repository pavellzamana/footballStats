import React from 'react';
import { Space, Card } from 'antd';
import moment, { Moment } from 'moment';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFixture } from '../../redux/actions';
import { IMatches } from '../common/types/Type';

import style from './Match.module.css';

interface MatchProps {
	key: number
	state: IMatches
}

const Match: React.FC<MatchProps> = (props) => {
	const homeTeam = props.state.homeTeam.team_name;
	const awayTeam = props.state.awayTeam.team_name;
	const homeTeamLogo = props.state.homeTeam.logo;
	const awayTeamLogo = props.state.awayTeam.logo;
	const {event_timestamp, round, firstHalfStart, fixture_id, goalsHomeTeam, goalsAwayTeam} = props.state;
	const dateEvent: Moment = moment.unix(event_timestamp);
	const dateString: string = dateEvent.format('MMM Do YYYY');
	const roundNo: string = round.replace('Regular Season -', 'Date: ' + dateString + 'Matchday:');
	const dispatch = useDispatch();

	return (
		<Space direction='vertical'>
			<NavLink to={'/details/' + fixture_id}>
				<Card title={roundNo} className={style.item} hoverable onClick={() => dispatch(setFixture(fixture_id))}>
					<div className={style.container}>
						{(!firstHalfStart && dateEvent < moment()) &&
						<p className={style.postpone}>Match Postponed</p>
						}
						<p>
							<img src={homeTeamLogo} alt={'teamLogo'} className={style.team_logo} />
							{homeTeam}
							<span className={style.score}>{goalsHomeTeam}</span>
						</p>
						<p>
							<img src={awayTeamLogo} alt={'teamLogo'} className={style.team_logo} />
							{awayTeam}
							<span className={style.score}>{goalsAwayTeam}</span>
						</p>
					</div>
				</Card>
			</NavLink>
		</Space>
	);
};

export default Match;