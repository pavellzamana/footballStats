import { GET_RESULTS, SET_SORT_ASC, SET_SORT_RESULTS } from './types';
import { IMatches } from '../components/common/types/Type';

const resultsInitialState: resultsType = {
	matches: [],
	sortedMatches: [],
	sortASC: true,
};

export const resultsReducer = (state = resultsInitialState, action: any) => {
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
	matches?: Array<IMatches>
	sortedMatches?: Array<IMatches>
	sortASC?: boolean
}