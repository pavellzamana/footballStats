import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/rootReducer";
import {Card, Layout, Button} from "antd";
import Preloader from "../common/preloader/Preloader";
import {setFeaturedResults, setFixture, setFixtureID} from "../../redux/actions";
import {IDetails} from "../common/types/Type";
import {withRouter, useHistory, NavLink} from "react-router-dom"

import style from "./Details.module.css"
import moment from "moment";
import MatchDetail from "./MatchDetail/MatchDetail";

const { Header } = Layout

const DetailsWithRouter: React.FC<any> = (props) => {
    const featuredResults = useSelector((state: AppStateType) => state.details.featuredResults)
    const fixtureDetails = useSelector((state: AppStateType) => state.details.fixture)
    const fixtureDate = useSelector((state: AppStateType) => state.details.eventDate)
    const results = useSelector((state: AppStateType) => state.results.matches)
    const dispatch = useDispatch()
    const history = useHistory()
    const fixID: number = props.location.pathname.replace('/details/', '')
    const setFixtureData = (id: number) => {
        dispatch(setFixture(id))
    }

    if (!fixtureDetails.event_date) {
        setFixtureData(fixID)
    }

    useEffect(() => {
        dispatch(setFixtureID(fixID))
        dispatch(setFeaturedResults(results.filter((item: IDetails) =>
            moment.unix(item.event_timestamp).format("MMM Do YYYY") === fixtureDate)))
    }, [results])

    return (
        <>
            <Header className={style.head}>
                <Button className={style.button} onClick={() => history.push('/')} >‹ Back to results page</Button>
            </Header>
            <div className={style.container}>
                {fixtureDetails.event_date ? <>
                        <MatchDetail />
                    <Card
                        title={`Featured Results`}
                        headStyle={{textAlign: "center"}} className={style.card}>
                        {featuredResults.map((item: IDetails) =>
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
                    </Card></>
                : <Preloader/>}

            </div>
        </>
    )
}

const Details = withRouter(DetailsWithRouter)

export default Details