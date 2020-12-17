import React from "react";
import { IMatches } from "../common/types/Type";
import { useSelector } from "react-redux";
import {AppStateType} from "../../redux/rootReducer";
import {leagueType} from "../../redux/leagueReducer";
import Match from "../match/Match";
import HeaderMenu from "./HeaderMenu";

import style from './ResultsPage.module.css';

const ResultsPage: React.FC<leagueType> = () => {
    const match = useSelector((state: AppStateType) => state.results.sortedMatches)
    const sortASC = useSelector((state: AppStateType) => state.results.sortASC);

    return (
        <div>
            <HeaderMenu />
            <div className={style.item}>
                {match.map(
                    ((item: IMatches, i: number) =>
                        <Match
                            homeTeam={item.homeTeam.team_name}
                            homeTeamLogo={item.homeTeam.logo}
                            goalsHome={item.goalsHomeTeam}
                            awayTeam={item.awayTeam.team_name}
                            awayTeamLogo={item.awayTeam.logo}
                            goalsAway={item.goalsAwayTeam}
                            date={item.event_timestamp}
                            round={item.round}
                            isPostponed={item.firstHalfStart}
                            fixtureID={item.fixture_id}
                            key={i}/>)
                )}
            </div>
        </div>
    );

}

export default ResultsPage;