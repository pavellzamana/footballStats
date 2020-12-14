import React from "react";
import {Card, Col, Row} from "antd";
import style from "../Details.module.css";
import {IEvents} from "../../common/types/Type";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/rootReducer";

const MatchDetail: React.FC = () => {
    const fixtureDetails = useSelector((state: AppStateType) => state.details.fixture)
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
    let homeEvents: Array<IEvents>;
    let awayEvents: Array<IEvents>

    if (fixtureDetails.events) {
        homeEvents = fixtureDetails.events.filter((event: IEvents) => event.team_id === fixtureDetails.homeTeam.team_id)
        awayEvents = fixtureDetails.events.filter((event: IEvents) => event.team_id === fixtureDetails.awayTeam.team_id)
    }

    return (
        <Card
            title={`Match details for ${fixtureDetails.homeTeam.team_name} - ${fixtureDetails.awayTeam.team_name}`}
            className={style.card}>
            <div className={style.info + ' ' + style.content}>
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
            {fixtureDetails.events &&
            <div className={style.away}>
                <div>{homeEvents!.map((event: IEvents) =>
                    <Col span={24}>{event.elapsed}. {icon(event)} {event.type === 'subst' ?
                        event.player + '>' + event.assist : event.player}</Col>
                )}</div>
                <div>{awayEvents!.map((event: IEvents) =>
                    <Col span={24}>{event.elapsed}. {icon(event)} {event.type === 'subst' ?
                        event.player + '>' + event.assist : event.player}</Col>
                )}</div>
            </div>}
        </Card>
    )
}

export default MatchDetail