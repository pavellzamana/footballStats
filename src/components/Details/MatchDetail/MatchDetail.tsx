import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/rootReducer';
import { useHistory } from 'react-router-dom';
import { setFixture } from '../../../redux/actions';
import { Card } from 'antd';
import { IDetails, IEvents, Team } from '../../../api/types/type';

import style from '../Details.module.css';

const MatchDetail: React.FC = () => {
    const fixtureDetails = useSelector((state: AppStateType) => state.details.fixture);
    const featuredResults = useSelector((state: AppStateType) => state.details.featuredResults);
    const dispatch = useDispatch();
    const history = useHistory();
    const setFixtureData = (id: number) => {
        dispatch(setFixture(id));
    };
    let homeEvents: Array<IEvents> | undefined = undefined;
    let awayEvents: Array<IEvents> | undefined = undefined;
    const {homeTeam, awayTeam, goalsHomeTeam, goalsAwayTeam} = fixtureDetails;
    const icon: any = {
        Goal: <img
            src='https://www.pinclipart.com/picdir/big/218-2187811_thank-you-to-our-volunteers-and-sponsors-soccer.png'
            alt='Goal' className={style.icon} />,
        Card: <img src='https://upload.wikimedia.org/wikipedia/commons/f/fb/Yellow_card_icon.svg'
                   alt='Card' className={style.icon} />,
        subst: <img src='http://cdn.onlinewebfonts.com/svg/img_344041.png' alt='Sub'
                    className={style.icon} />,
    };
    if (fixtureDetails.events) {
        homeEvents = fixtureDetails.events.filter((event: IEvents) =>
                     event.team_id === fixtureDetails.homeTeam.team_id);
        awayEvents = fixtureDetails.events.filter((event: IEvents) =>
                     event.team_id === fixtureDetails.awayTeam.team_id);
    }
    const events = (eventType: typeof homeEvents) => {
        if (eventType) {
            return (
                <div>{eventType.map((event: IEvents, i: number) =>
                    <div key={i}>
                        {event.elapsed}. {icon[`${event.type}`]}
                        {event.type === 'subst' ? event.player + '>' + event.assist : event.player}
                    </div>,
                )}
                </div>
            );
        }
    };
    const teams = (teamType: Team, goals: number) => {
        return (
            <div className={style.team} onClick={() => history.push('/team/' + teamType.team_id)}>
                {teamType.team_name}
                <img src={teamType.logo} alt='teamLogo' className={style.img} />
                <span className={style.score}>{goals}</span>
            </div>
        );
    };

    return (
        <>
            <Card
                title={'Match Details for ' + fixtureDetails.homeTeam.team_name +
                       ' - ' + fixtureDetails.awayTeam.team_name}
                className={style.card}>
                <div className={style.result}>
                    {teams(homeTeam, goalsHomeTeam)}
                    {teams(awayTeam, goalsAwayTeam)}
                </div>
                {fixtureDetails.events ?
                    <div className={style.events}>
                        {events(homeEvents)}
                        {events(awayEvents)}
                    </div> :
                    <b>Match Postponed</b>
                }
            </Card>
            <Card title='Featured Results' className={style.card}>
                {featuredResults.map((item: IDetails, i: number) =>
                    <Card className={style.featured} key={i} hoverable onClick={() => {
                        history.push('/Details/' + item.fixture_id);
                        setFixtureData(item.fixture_id);
                    }}>
                        <p className={style.info}>
                            <img src={item.homeTeam.logo} alt='teamLogo' className={style.logo} />
                            {item.homeTeam.team_name} {item.goalsHomeTeam}
                            <span> - </span>
                            {item.goalsAwayTeam} {item.awayTeam.team_name}
                            <img src={item.awayTeam.logo} alt='teamLogo' className={style.logo} />
                        </p>
                    </Card>,
                )}
            </Card>
        </>
    );
};

export default MatchDetail;