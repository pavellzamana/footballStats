import { AnyAction } from 'redux';
import { GET_RESULTS, SET_SORT_ASC, SET_SORT_RESULTS } from './types';
import { IMatches } from '../api/types/type';


const resultsInitialState: resultsType = {
	matches: [],
	sortedMatches: [],
	sortASC: true,
};

export const resultsReducer = (state = resultsInitialState, action: AnyAction) => {
	switch (action.type) {
		case GET_RESULTS:
			return { ...state, matches: action.payload, sortedMatches: action.payload };
		case SET_SORT_RESULTS: {
			return { ...state, sortedMatches: action.payload };
		}
		case SET_SORT_ASC: {
			return { ...state, sortASC: !state.sortASC };
		}
		default:
			return state;
	}
};

export interface resultsType {
	matches: IMatches[]
	sortedMatches: IMatches[]
	sortASC: boolean
}