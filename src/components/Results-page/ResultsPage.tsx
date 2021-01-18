import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Match from '../Match/Match';
import HeaderMenu from './HeaderMenu';
import { dataPushToDatabase, dataRemoveFromDatabase } from '../../firebase/handlers';
import { pullFavourites } from '../../redux/actions';
import { IFavourites, IFavouritesObject, IMatches, ITable } from '../../api/types/type';
import { AppStateType } from '../../redux/rootReducer';
import { leagueType } from '../../redux/leagueReducer';
import { Card } from 'antd';
import { StarOutlined, StarTwoTone } from '@ant-design/icons';

import style from './ResultsPage.module.css';

const ResultsPage: React.FC<leagueType> = () => {
	const match = useSelector((state: AppStateType) => state.results.sortedMatches);
	const sortASC = useSelector((state: AppStateType) => state.results.sortASC);
	const table = useSelector<AppStateType, ITable[]>(state => state.team.table);
	const isAuth = useSelector<AppStateType, boolean|undefined>(state => state.user.isAuth);
	const userID = useSelector<AppStateType, string>(state => state.user.userID);
	const favourites = useSelector<AppStateType, IFavouritesObject>((state) => state.user.favourites);
	const dispatch = useDispatch();
	const history = useHistory();
	const favouritesHandle = {
		addFavourites: (item: ITable) => {
			const {teamName, team_id, logo} = item;
			dataPushToDatabase(userID, {teamName, team_id, logo}).then(() => dispatch(pullFavourites(userID)));
		},
		removeFavourites: (item: ITable) => {
			const { teamName } = item;
			dataRemoveFromDatabase(userID, Object.keys(favourites).find(key =>
				favourites[key].teamName === teamName))
				.then(() => dispatch(pullFavourites(userID)));
		}
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
						<div className={style.table} key={i}>
							<div className={style.team}>
								{(isAuth) &&
								<>
									{favourites && isFavouriteTeam(item.teamName) ?
										<StarTwoTone twoToneColor='#FFFF00'
													 onClick={() => favouritesHandle.removeFavourites(item)} />
										:
										<StarOutlined onClick={() => favouritesHandle.addFavourites(item)} />
									}
								</>
								}
								<img src={item.logo} alt='teamLogo' className={style.icon} />
								<span onClick={() => history.push('/team/' + item.team_id)}>{item.teamName}</span>
							</div>
							{item.points}
						</div>
					)}
				</Card>
			</div>
		</>
	);
};

export default ResultsPage;