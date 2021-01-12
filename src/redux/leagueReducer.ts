import { GET_COUNTRIES, GET_SEASONS, SET_FIXTURE_DETAILS, SET_LEAGUE_ID } from './types';
import { ICountry, ISeasons } from '../components/common/types/Type';
import { AnyAction } from 'redux';

const initialState: leagueType = {
    leagueID: undefined,
    countries: [],
    seasons: [],
};

export const leagueReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_LEAGUE_ID:
            return { ...state, leagueID: action.id };
        case GET_COUNTRIES:
            return { ...state, countries: action.countriesList };
        case GET_SEASONS:
            return { ...state, seasons: action.seasonsList };
        case SET_FIXTURE_DETAILS: {
            return { ...state, leagueID: action.league_id };
        }
        default:
            return state;
    }
};

export interface leagueType {
    leagueID?: number,
    countries?: Array<ICountry>,
    seasons?: Array<ISeasons>
}

