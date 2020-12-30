import { combineReducers } from 'redux';
import { leagueReducer } from './leagueReducer';
import { resultsReducer } from './resultsReducer';
import { detailsReducer } from './detailsReducer';
import { teamReducer } from './teamReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    league: leagueReducer,
    results: resultsReducer,
    details: detailsReducer,
    team: teamReducer,
    user: userReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
