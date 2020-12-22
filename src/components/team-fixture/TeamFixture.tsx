import React, {useEffect} from "react";
import {Button, Card, Layout} from "antd";
import {NavLink, useHistory, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getTeamFixture, setFixture} from "../../redux/actions";
import {IDetails, ITable} from "../common/types/Type";
import {AppStateType} from "../../redux/rootReducer";
import cn from 'classnames'

import style from "./TeamFixture.module.css";

const { Header } = Layout;

const Fixture: React.FC<any> = (props) => {
    const history = useHistory();
    const teamID: number = props.location.pathname.replace('/team/', '');
    const dispatch = useDispatch();
    const team = useSelector<AppStateType, IDetails[]>((state) => state.team.teamFixtures);
    const teamName = useSelector<AppStateType, string>((state) => state.team.teamName);
    const table = useSelector<AppStateType, ITable[]>(state => state.team.table)

    const setFixtureData = (id: number) => {
        dispatch(setFixture(id));
    }

    useEffect(() => {
        dispatch(getTeamFixture(teamID));
    }, [teamID]);


        return (
            <div>
                <Header className={style.head}>
                    <Button className={style.button} onClick={() => history.push('/')} >‹ Back to results page</Button>
                </Header>
                <div className={style.container}>
                    <Card
                        title={`League Standings`}
                        className={style.card}>
                        {table.map((item) =>
                            <>
                                <NavLink to={'/team/' + item.team_id}>
                                    <div className={style.table}>
                                        <div className={cn({
                                            [style.bold]: item.teamName === teamName
                                        })}>
                                            <img src={item.logo} alt={'teamLogo'}
                                                 className={style.logo}/>
                                            {item.teamName}
                                        </div>
                                        <div>
                                            {item.points}
                                        </div>
                                    </div>
                                </NavLink>
                            </>
                        )}
                    </Card>

                    <Card
                        title={`Last fixtures for ${teamName}`}
                        className={style.card}>
                        {team.map((item) =>
                            <>
                                <NavLink to={'/details/' + item.fixture_id}>
                                    <Card className={style.featured} hoverable onClick={() => setFixtureData(item.fixture_id)}>
                                        <p className={style.info}><img src={item.homeTeam.logo} alt={'teamLogo'}
                                                                       className={style.logo}/><span>
                                    {item.homeTeam.team_name} {item.goalsHomeTeam}</span> -  <span>{item.goalsAwayTeam} {item.awayTeam.team_name}
                                </span><img src={item.awayTeam.logo} alt={'teamLogo'} className={style.logo} /></p>
                                    </Card>
                                </NavLink>
                            </>
                        )}
                    </Card>
                </div>
            </div>
    );
}

const TeamFixture = withRouter(Fixture);

export default TeamFixture;