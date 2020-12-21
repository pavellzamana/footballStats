import {IMatches} from "../components/common/types/Type";
import {GET_TEAM_FIXTURE} from "./types";

let resultsInitialState: teamType = {
    teamFixtures: [],
    teamName: undefined,
    table: [],
}

export const teamReducer = (state = resultsInitialState, action: any) => {
    switch (action.type) {
        case GET_TEAM_FIXTURE:
            return {...state, teamFixtures: action.payload, teamName: action.name, table: action.table}
        default:
            return state
    }
}

export interface teamType {
    teamFixtures?: IMatches[]
    teamName?: string
    table?: any[]
}