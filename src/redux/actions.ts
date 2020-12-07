import {SET_LEAGUEID} from "./types";

export function setLeagueID(id: number) {
    console.log('id' + id)
    return {
        type: SET_LEAGUEID,
        id
    }
}

export type leagueIDActionType = typeof setLeagueID