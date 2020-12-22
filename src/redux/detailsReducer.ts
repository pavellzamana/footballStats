import { SET_DETAILS, SET_FEATURED_RESULTS, SET_FIXTURE_DETAILS, SET_FIXTURE_ID } from './types';


const initialState: detailsType = {
	fixture_id: null,
	fixture: [],
	eventDate: '',
	featuredResults: [],
};

export const detailsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SET_DETAILS:
			return { ...state, fixture_id: action.fixture_id, eventDate: action.eventDate };
		case SET_FIXTURE_DETAILS: {
			return { ...state, fixture_id: action.fixture_id, fixture: action.fixture, eventDate: action.eventDate };
		}
		case SET_FIXTURE_ID: {
			return { ...state, fixture_id: action.fixture_id };
		}
		case SET_FEATURED_RESULTS: {
			return {
				...state, featuredResults: action.featuredResults,
			};
		}
		default:
			return state;
	}
};

export interface detailsType {
	fixture_id?: number | null,
	fixture?: [],
	eventDate?: string,
	featuredResults?: []
}