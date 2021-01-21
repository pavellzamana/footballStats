import { AnyAction } from 'redux';
import { GET_TABLE, GET_TEAM_FIXTURE } from './types';
import { IMatches, ITable } from '../api/types/type';

const resultsInitialState: teamType = {
	teamFixtures: [],
	teamName: undefined,
	table: [],
};

export const teamReducer = (state = resultsInitialState, action: AnyAction) => {
	switch (action.type) {
		case GET_TEAM_FIXTURE:
			return { ...state, teamFixtures: action.payload, teamName: action.name, table: action.table };
		case GET_TABLE:
			return {...state, table: action.table};
		default:
			return state;
	}
};

export interface teamType {
	teamFixtures: IMatches[]
	teamName?: string
	table: ITable[]
}