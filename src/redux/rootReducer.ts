import {combineReducers} from "redux";
import {leagueReducer} from "./leagueReducer";
import {resultsReducer} from "./resultsReducer";
import {detailsReducer} from "./detailsReducer";

export const rootReducer = combineReducers({
    league: leagueReducer,
    results: resultsReducer,
    details: detailsReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
