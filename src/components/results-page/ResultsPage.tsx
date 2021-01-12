import React from 'react';
import { IFavourites, IFavouritesObject, IMatches, ITable } from '../common/types/Type';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { leagueType } from '../../redux/leagueReducer';
import Match from '../match/Match';
import HeaderMenu from './HeaderMenu';
import { StarOutlined, StarTwoTone } from '@ant-design/icons';
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';
import { dataPushToDatabase, dataRemoveFromDatabase } from '../../firebase/handlers';
import { pullFavourites } from '../../redux/actions';

import style from './ResultsPage.module.css';

const ResultsPage: React.FC<leagueType> = () => {
	const match = useSelector((state: AppStateType) => state.results.sortedMatches);
	const sortASC = useSelector((state: AppStateType) => state.results.sortASC);
	const table = useSelector<AppStateType, ITable[]>(state => state.team.table);
	const isAuth = useSelector<AppStateType, boolean|undefined>(state => state.user.isAuth);
	const userID = useSelector<AppStateType, string>(state => state.user.userID);
	const favourites = useSelector<AppStateType, IFavouritesObject>((state) => state.user.favourites);
	const dispatch = useDispatch();
	const favouritesHandler = async(e: React.SyntheticEvent, team: IFavourites) => {
		e.preventDefault();
		dataPushToDatabase(userID, team).then(() => dispatch(pullFavourites(userID)));
	};
	const removeFavourites = (e: React.SyntheticEvent, team: string) => {
		e.preventDefault();
		dataRemoveFromDatabase(userID, Object.keys(favourites).find(key => favourites[key].teamName === team))
			.then(() => dispatch(pullFavourites(userID)));
	};
	const favouritesArray: IFavourites[] = [];
	if (favourites) {
		favouritesArray.push(...Object.values(favourites));
	}
	const isFavouriteTeam: (team: string) => boolean = (team) => {
		return !!favouritesArray.find((name) => name.teamName === team);
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

									{(isAuth) &&
									<>
										{favourites && isFavouriteTeam(item.teamName) ?
											<StarTwoTone twoToneColor='#FFFF00'
														 onClick={(e) => {removeFavourites(e, item.teamName);}} />
											:
											<StarOutlined onClick={(e) => {
												favouritesHandler(e, {
													teamName: item.teamName,
													teamID: item.team_id,
													teamLogo: item.logo
												});}}
											/>
										}
									</>
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