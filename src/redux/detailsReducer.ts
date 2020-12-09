import {SET_DETAILS} from "./types";

let initialState = {
    fixture_id: null,
    fixture: [],
    eventDate: ''
}

export const detailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_DETAILS:
            return {...state, fixture: action.fixture, fixture_id: action.fixtureID, eventDate: action.eventDate}
        default:
            return state
    }
}

export interface leagueType {
    fixture_id?: number,
    fixture?: [],
    eventDate?: string
}