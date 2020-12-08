import {GET_COUNTRIES, GET_RESULTS, GET_SEASONS, SET_LEAGUEID} from "./types";
import {ICountry, ISeasons} from "../components/common/types/Type";
import {ThunkAction} from "redux-thunk";
import {getCountries, getMatches, getSeasons} from "../api/Api";
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

export const getResults = (leagueID: number): ThunkAction<void, {}, {}, AnyAction> =>
    async (dispatch) => {
        const payload = await getMatches(leagueID)
        dispatch({
            type: GET_RESULTS,
            payload
        })
    }


