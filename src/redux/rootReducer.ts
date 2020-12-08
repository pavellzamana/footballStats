import {combineReducers} from "redux";
import {leagueReducer} from "./leagueReducer";
import {resultsReducer} from "./resultsReducer"


export const rootReducer = combineReducers({
    league: leagueReducer,
    results: resultsReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
