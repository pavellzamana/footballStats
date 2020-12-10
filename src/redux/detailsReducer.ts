import {SET_DETAILS, SET_FIXTURE_DETAILS, SET_FIXTURE_ID} from "./types";

let initialState = {
    fixture_id: null,
    fixture: [],
    eventDate: ''
}

export const detailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_DETAILS:
            return {...state, fixture_id: action.fixture_id, eventDate: action.eventDate}
        case SET_FIXTURE_DETAILS: {
            return {...state, fixture_id: action.fixture_id, fixture: action.fixture, eventDate: action.eventDate}
        }
        case SET_FIXTURE_ID: {
            return {...state, fixture_id: action.fixture_id}
        }
        default:
            return state
    }
}
export interface detailsType {
    fixture_id?: number,
    fixture?: [],
    eventDate?: string
}