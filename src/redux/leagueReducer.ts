import {SET_LEAGUEID} from "./types";

let initialState = {
    leagueID: 2790,
}

export const leagueReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_LEAGUEID:
            return {...state, leagueID: action.id}
        default:
            return state
    }
}

export interface leagueType {
    leagueID?: number
}

