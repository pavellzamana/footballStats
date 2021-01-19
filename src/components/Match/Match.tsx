import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setFixture } from '../../redux/actions';
import { Space, Card } from 'antd';
import moment, { Moment } from 'moment';
import { IMatches } from '../../api/types/type';

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
	const history = useHistory();

	return (
		<Space direction='vertical'>
			<Card title={roundNo} className={style.item} hoverable onClick={() => {
				dispatch(setFixture(fixture_id));
				history.push('/Details/' + fixture_id);
			}}>
				<div className={style.container}>
					{(!firstHalfStart && dateEvent < moment()) && <p className={style.postpone}>Match Postponed</p>}
					<p>
						<img src={homeTeamLogo} alt='teamLogo' className={style.team_logo} />
						{homeTeam}
						<span className={style.score}>{goalsHomeTeam}</span>
					</p>
					<p>
						<img src={awayTeamLogo} alt='teamLogo' className={style.team_logo} />
						{awayTeam}
						<span className={style.score}>{goalsAwayTeam}</span>
					</p>
				</div>
			</Card>
		</Space>
	);
};

export default Match;