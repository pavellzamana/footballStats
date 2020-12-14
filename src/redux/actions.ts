import {
    GET_COUNTRIES,
    GET_RESULTS,
    GET_SEASONS,
    SET_FEATURED_RESULTS,
    SET_FIXTURE_DETAILS, SET_FIXTURE_ID,
    SET_LEAGUEID
} from "./types";
import {ICountry, IMatches, ISeasons} from "../components/common/types/Type";
import {ThunkAction} from "redux-thunk";
import {getCountries, getFixtureDetails, getMatches, getSeasons} from "../api/Api";
import {AnyAction} from "redux";
import moment from "moment";

export const setLeagueID = (id: number) => {
    return {
        type: SET_LEAGUEID,
        id
    }
}


export const getCountriesList = (): ThunkAction<void, {}, {}, AnyAction> =>
    async (dispatch) => {
        const response = await getCountries()
        const countriesList = response.filter((item: ICountry) => {
            return item.type === 'League'
        })
        dispatch({
            type: GET_COUNTRIES,
            countriesList
        })
    }

export const getSeasonsList = (leagueID: number): ThunkAction<void, {}, {}, AnyAction> =>
    async (dispatch) => {
        const response = await getSeasons(leagueID)

        const seasonsList = response.filter((item: ISeasons) => {
            return item.season > 2015
        })
        dispatch({
            type: GET_SEASONS,
            seasonsList
        })
    }

export const getResults = (payload: any) => {
    return {
        type: GET_RESULTS,
        payload
    }
}

export const setFixtureID = (fixture_id: number) => {
    return {
        type: SET_FIXTURE_ID,
        fixture_id
    }
}

export const setFixture = (fixture_id: number): ThunkAction<void, {}, {}, AnyAction> =>
    async (dispatch) => {
        const fixture = await getFixtureDetails(fixture_id)
        const matches = await getMatches(fixture.league_id)
        dispatch({
            type: SET_FIXTURE_DETAILS,
            fixture: fixture,
            fixture_id: fixture.fixture_id,
            eventDate: moment.unix(fixture.event_timestamp).format("MMM Do YYYY"),
            league_id: fixture.league_id,
            featuredResults: fixture
        })
        dispatch({
            type: GET_RESULTS,
            payload: matches
        })
    }

    export const setFeaturedResults = (featuredResults: Array<IMatches>) => {
        return {
            type: SET_FEATURED_RESULTS,
            featuredResults
        }
    }






