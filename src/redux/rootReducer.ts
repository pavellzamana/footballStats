import {combineReducers} from "redux";
import {leagueReducer} from "./leagueReducer";


export const rootReducer = combineReducers({
    league: leagueReducer,
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
