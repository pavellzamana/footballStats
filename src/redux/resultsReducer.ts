import {GET_RESULTS} from "./types";
import {IMatches} from "../components/common/types/Type";

let resultsInitialState = {
    matches: [],
}

export const resultsReducer = (state = resultsInitialState, action: any) => {
    switch (action.type) {
        case GET_RESULTS:
            return {...state, matches: action.payload}
        default:
            return state
    }
}

export interface resultsType {
    matches?: Array<IMatches>
    matchesFullList?: Array<IMatches>
}