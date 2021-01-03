import React, { useEffect } from 'react';
import { IMatches, ITable } from '../common/types/Type';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { leagueType } from '../../redux/leagueReducer';
import Match from '../match/Match';
import HeaderMenu from './HeaderMenu';

import style from './ResultsPage.module.css';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { dataPullFromDatabase, dataPushToDatabase, dataRemoveFromDatabase } from '../../firebase/handlers';
import { pullFavourites } from '../../redux/actions';

const ResultsPage: React.FC<leagueType> = () => {
	const match = useSelector((state: AppStateType) => state.results.sortedMatches);
	const sortASC = useSelector((state: AppStateType) => state.results.sortASC);
	const table = useSelector<AppStateType, ITable[]>(state => state.team.table);
	const isAuth = useSelector<AppStateType, boolean|undefined>(state => state.user.isAuth);
	const userID = useSelector<AppStateType, string>(state => state.user.userID);
	const favourites = useSelector((state: AppStateType) => state.user.favourites);
	const dispatch = useDispatch();
	const favouritesHandler = async(e: any, name: string) => {
		e.preventDefault();
		// @ts-ignore
		await dataPushToDatabase(userID, name).then(dispatch(pullFavourites(userID)));
	};

	const removeFavourites = (e: any, team: string) => {
		e.preventDefault();
		const findKey = (team: string) => {
				return Object.keys(favourites).find(key => favourites[key] === team);
		};
		dataRemoveFromDatabase(userID, findKey(team));
	};
	return (
		<>
			<HeaderMenu />
			<div className={style.container}>
				<div className={style.item}>
					{match.map(
						((item: IMatches, i: number) => <Match state={item} key={i} />),
					)}
				</div>
				<Card title='League Standings' className={style.card}>
					{table.map((item, i: number) =>
						<NavLink to={'/team/' + item.team_id} key={i}>
							<div className={style.table}>
								<div className={style.team}>
									{isAuth &&
									<button onClick={(e) => {
										favouritesHandler(e, item.teamName);
									}}>
										+
									</button>

									}
									{isAuth &&
									<button onClick={(e) => {
										removeFavourites(e, item.teamName);
									}}>
										-
									</button>

									}
									<img src={item.logo} alt={'teamLogo'} className={style.icon} />
									<span>{item.teamName}</span>
								</div>
								{item.points}
							</div>
						</NavLink>,
					)}
				</Card>
			</div>
		</>
	);
};

export default ResultsPage;