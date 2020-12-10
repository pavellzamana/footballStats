import {SET_DETAILS, SET_FIXTURE_DETAILS} from "./types";

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
            return {...state, fixture: action.fixture}
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