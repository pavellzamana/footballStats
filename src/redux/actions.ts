import { Dispatch } from 'redux';
import {
    GET_COUNTRIES, GET_FAVOURITES,
    GET_RESULTS,
    GET_SEASONS, GET_TABLE, GET_TEAM_FIXTURE, LOG_IN, LOG_OUT, PASSWORD_CHANGE,
    SET_FEATURED_RESULTS,
    SET_FIXTURE_DETAILS, SET_FIXTURE_ID,
    SET_LEAGUE_ID, SET_SORT_ASC, SET_SORT_RESULTS, USERNAME_CHANGE,
} from './types';
import { ICountry, IMatches } from '../api/types/type';
import {
    getCountries,
    getFixtureDetails,
    getMatches,
    getSeasons,
    getStandings,
    getTeamFixtures,
    getTeamName,
} from '../api/Api';
import moment from 'moment';
import { dataPullFromDatabase } from '../firebase/handlers';


export const setLeagueID: (id: number) => void = (id) => {
    return {
        type: SET_LEAGUE_ID,
        id
    };
};

export const getCountriesList = () =>
    async (dispatch: Dispatch) => {
        const response = await getCountries();
        const countriesList = response.filter((item: ICountry) => {
            return item.type === 'League';
        });
        dispatch({
            type: GET_COUNTRIES,
            countriesList
        });
    };

export const getSeasonsList = (leagueID: number) =>
    async (dispatch: Dispatch) => {
        const seasonsList = await getSeasons(leagueID);
        dispatch({
            type: GET_SEASONS,
            seasonsList
        });
    };

export const getResults: (payload: IMatches[]) => void = (payload) => {
    return {
        type: GET_RESULTS,
        payload
    };
};

export const setSort: (payload: IMatches[]) => void = (payload) => {
    return {
        type: SET_SORT_RESULTS,
        payload
    };
};

export const setSortASC: () => void = () => {
    return {
        type: SET_SORT_ASC
    };
};

export const setFixtureID: (fixture_id: number) => void = (fixture_id) => {
    return {
        type: SET_FIXTURE_ID,
        fixture_id
    };
};

export const setFixture = (fixture_id: number) =>
    async (dispatch: Dispatch) => {
        const fixture = await getFixtureDetails(fixture_id);
        const matches = await getMatches(fixture.league_id);
        dispatch({
            type: SET_FIXTURE_DETAILS,
            fixture: fixture,
            fixture_id: fixture.fixture_id,
            eventDate: moment.unix(fixture.event_timestamp).format('MMM Do YYYY'),
            league_id: fixture.league_id,
            featuredResults: fixture
        });
        dispatch({
            type: GET_RESULTS,
            payload: matches
        });
    };

export const setFeaturedResults: (featuredResults: IMatches[]) => void = (featuredResults) => {
    return {
        type: SET_FEATURED_RESULTS,
        featuredResults
    };
};

export const getTeamFixture = (teamID: number) =>
    async (dispatch: Dispatch) => {
        const response = await getTeamFixtures(teamID);
        const name = await getTeamName(teamID);
        const table = await getStandings(response[0].league_id);
        dispatch({
            type: GET_TEAM_FIXTURE,
            payload: response,
            name,
            table: table
        });
    };

export const getTable = (leagueID: number) =>
    async (dispatch: Dispatch) => {
        const table = await getStandings(leagueID);
        dispatch({
            type: GET_TABLE,
            table,
        });
    };

export const changeLoginData: (payload: string) => void = (payload) => {
    return {
        type: USERNAME_CHANGE,
        payload
    };
};

export const changePasswordData: (payload: string) => void = (payload) => {
    return {
        type: PASSWORD_CHANGE,
        payload,

    };
};

export const logIn: (payload: string, uId: string) => void = (payload, uId) => {
    return {
        type: LOG_IN,
        payload,
        uId
    };
};

export const logOut: () => void = () => {
    return {
        type: LOG_OUT
    };
};

export const pullFavourites = (userID: string)  =>
    async (dispatch: Dispatch)  => {
        const favourites = await dataPullFromDatabase(userID);
        dispatch({
            type: GET_FAVOURITES,
            favourites
        });
    };