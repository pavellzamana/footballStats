import { combineReducers } from 'redux';
import { leagueReducer } from './leagueReducer';
import { resultsReducer } from './resultsReducer';
import { detailsReducer } from './detailsReducer';
import { teamReducer } from './teamReducer';

export const rootReducer = combineReducers({
    league: leagueReducer,
    results: resultsReducer,
    details: detailsReducer,
    team: teamReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
