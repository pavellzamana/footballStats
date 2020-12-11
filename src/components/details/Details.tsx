import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/rootReducer";
import {Card, Row, Col, Layout, Button} from "antd";
import Preloader from "../common/preloader/Preloader";
import {setFeaturedResults, setFixture, setFixtureID} from "../../redux/actions";
import {IDetails, IEvents} from "../common/types/Type";
import {withRouter, useHistory, NavLink} from "react-router-dom"

import style from "./Details.module.css"
import moment from "moment";

const { Header } = Layout

const DetailsWithRouter: React.FC<any> = (props) => {
    const featuredResults = useSelector((state: AppStateType) => state.details.featuredResults)
    const fixtureDetails = useSelector((state: AppStateType) => state.details.fixture)
    const fixtureDate = useSelector((state: AppStateType) => state.details.eventDate)
    const results = useSelector((state: AppStateType) => state.results.matches)
    const dispatch = useDispatch()
    const history = useHistory()
    const fixID: number = props.location.pathname.replace('/details/', '')
    let homeEvents: Array<IEvents>;
    let awayEvents: Array<IEvents>;

    const icon = (event: IEvents) => {
        switch (event.type) {
            case "Goal":
                return <img src={"https://www.pinclipart.com/picdir/big/218-2187811_thank-you-to-our-volunteers-and-sponsors-soccer.png"} alt={'Goal'}
                            className={style.icon}/>
            case "Card": {
                return <img src={"https://upload.wikimedia.org/wikipedia/commons/f/fb/Yellow_card_icon.svg"}
                            alt={'Card'}
                            className={style.icon}/>
            }
            case "subst":
                return <img src={"http://cdn.onlinewebfonts.com/svg/img_344041.png"} alt={'Sub'}
                            className={style.icon}/>
        }
    }

    if (fixtureDetails.events) {
        homeEvents = fixtureDetails.events.filter((event: IEvents) => event.team_id === fixtureDetails.homeTeam.team_id)
        awayEvents = fixtureDetails.events.filter((event: IEvents) => event.team_id === fixtureDetails.awayTeam.team_id)

    } else {
        dispatch(setFixture(fixID))
    }

    useEffect(() => {
        dispatch(setFixtureID(fixID))
        dispatch(setFeaturedResults(results.filter((item: IDetails) =>
            moment.unix(item.event_timestamp).format("MMM Do YYYY") === fixtureDate)))
    })

    return (
        <>
            <Header className={style.head}>
                <Button className={style.button} onClick={() => history.push('/')} >‹ Back to results page</Button>
            </Header>
            <div className={style.container}>

                {fixtureDetails.events ?
                    <Card
                        title={`Match details for ${fixtureDetails.homeTeam.team_name} - ${fixtureDetails.awayTeam.team_name}`}
                        headStyle={{textAlign: "center"}} className={style.card + ' ' + style.items}>
                        <div className={style.info + ' ' + style.content}>
                            {fixID}
                            <Row justify='space-between'>
                                <Col span={12}><b>{fixtureDetails.homeTeam.team_name}</b></Col>
                                <Col span={12}><b>{fixtureDetails.awayTeam.team_name}</b></Col>
                            </Row>
                            <Row justify='space-between'>
                                <Col span={12}><img src={fixtureDetails.homeTeam.logo} alt={'teamLogo'}
                                                    className={style.img}/></Col>
                                <Col span={12}><img src={fixtureDetails.awayTeam.logo} alt={'teamLogo'}
                                                    className={style.img}/></Col>
                            </Row>
                            <Row justify='space-between'>
                                <Col span={12} className={style.score}>{fixtureDetails.goalsHomeTeam}</Col>
                                <Col span={12} className={style.score}>{fixtureDetails.goalsAwayTeam}</Col>
                            </Row>
                        </div>
                        <div className={style.away}>
                            <div>{homeEvents!.map((event: IEvents) =>
                                <Col span={24}>{event.elapsed}. {icon(event)} {event.type === 'subst' ?
                                    event.player + '>' + event.assist : event.player}</Col>
                            )}</div>
                            <div>{awayEvents!.map((event: IEvents) =>
                                <Col span={24}>{event.elapsed}. {icon(event)} {event.type === 'subst' ?
                                    event.player + '>' + event.assist : event.player}</Col>
                            )}</div>
                        </div>
                    </Card> :
                    <Preloader/>}
                <Card
                    title={`Featured Results`}
                    headStyle={{textAlign: "center"}} className={style.card}>
                    {featuredResults.map((item: IDetails) =>
                        <>
                            <NavLink to={'/details/' + item.fixture_id}>
                                <Card className={style.featured} hoverable onClick={() => dispatch(setFixture(item.fixture_id))}>
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
        </>
    )
}

const Details = withRouter(DetailsWithRouter)

export default Details