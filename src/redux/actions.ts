import {GET_COUNTRIES, GET_RESULTS, GET_SEASONS, SET_DETAILS, SET_LEAGUEID} from "./types";
import {ICountry, ISeasons} from "../components/common/types/Type";
import {ThunkAction} from "redux-thunk";
import {getCountries, getFixtureDetails, getSeasons} from "../api/Api";
import {AnyAction} from "redux";

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



export const setFixtureData = (fixture_id: number, eventDate: string): ThunkAction<void, {}, {}, AnyAction> =>
    async (dispatch) => {
    const fixture = await getFixtureDetails(fixture_id)
        dispatch({
            type: SET_DETAILS,
            fixture_id,
            fixture,
            eventDate
        })
    }




