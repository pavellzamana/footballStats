import {GET_RESULTS, SET_SORT_RESULTS} from "./types";
import {IMatches} from "../components/common/types/Type";

let resultsInitialState: resultsType = {
    matches: [],
    sortedMatches: []
}

export const resultsReducer = (state = resultsInitialState, action: any) => {
    switch (action.type) {
        case GET_RESULTS:
            return {...state, matches: action.payload, sortedMatches: action.payload}
        case SET_SORT_RESULTS: {
            return {...state, sortedMatches: action.payload}
        }
        default:
            return state
    }
}

export interface resultsType {
    matches?: Array<IMatches>
    sortedMatches?: Array<IMatches>
}