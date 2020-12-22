import React from 'react';
import { Card } from 'antd';
import { IDetails, IEvents } from '../../common/types/Type';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/rootReducer';
import { NavLink } from 'react-router-dom';
import { setFixture } from '../../../redux/actions';

import style from '../Details.module.css';

const MatchDetail: React.FC = () => {
    const fixtureDetails = useSelector((state: AppStateType) => state.details.fixture);
    const featuredResults = useSelector((state: AppStateType) => state.details.featuredResults);
    const dispatch = useDispatch();
    const setFixtureData = (id: number) => {
        dispatch(setFixture(id));
    };
    let homeEvents: Array<IEvents>;
    let awayEvents: Array<IEvents>;
    const icon: any = {
        Goal: <img
            src={'https://www.pinclipart.com/picdir/big/218-2187811_thank-you-to-our-volunteers-and-sponsors-soccer.png'}
            alt={'Goal'}
            className={style.icon} />,
        Card: <img src={'https://upload.wikimedia.org/wikipedia/commons/f/fb/Yellow_card_icon.svg'}
                   alt={'Card'}
                   className={style.icon} />,
        subst: <img src={'http://cdn.onlinewebfonts.com/svg/img_344041.png'} alt={'Sub'}
                    className={style.icon}
        />,
    };
    if (fixtureDetails.events) {
        homeEvents = fixtureDetails.events.filter((event: IEvents) =>
                     event.team_id === fixtureDetails.homeTeam.team_id);
        awayEvents = fixtureDetails.events.filter((event: IEvents) =>
                     event.team_id === fixtureDetails.awayTeam.team_id);
    }

    return (
        <>
            <Card
                title={'Match details for ' + fixtureDetails.homeTeam.team_name +
                       ' - ' + fixtureDetails.awayTeam.team_name}
                className={style.card}>
                <div className={style.result}>
                    <div>
                        <NavLink to={'/team/' + fixtureDetails.homeTeam.team_id}>
                            <div>
                                {fixtureDetails.homeTeam.team_name}
                            </div>
                            <div>
                                <img src={fixtureDetails.homeTeam.logo} alt={'teamLogo'} className={style.img} />
                            </div>
                            <div className={style.score}>
                                {fixtureDetails.goalsHomeTeam}
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={'/team/' + fixtureDetails.awayTeam.team_id}>
                            <div>
                                {fixtureDetails.awayTeam.team_name}
                            </div>
                            <div>
                                <img src={fixtureDetails.awayTeam.logo} alt={'teamLogo'} className={style.img} />
                            </div>
                            <div className={style.score}>
                                {fixtureDetails.goalsAwayTeam}
                            </div>
                        </NavLink>
                    </div>
                </div>
                {fixtureDetails.events ?
                    <div className={style.away}>
                        <div>{homeEvents!.map((event: IEvents, i: number) =>
                            <div key={i}>
                                {event.elapsed}. {icon[`${event.type}`]}
                                {event.type === 'subst' ? event.player + '>' + event.assist : event.player}
                            </div>,
                        )}
                        </div>
                        <div>{awayEvents!.map((event: IEvents, i: number) =>
                            <div key={i}>
                                {event.elapsed}. {icon[`${event.type}`]}
                                {event.type === 'subst' ? event.player + '>' + event.assist : event.player}
                            </div>,
                        )}
                        </div>
                    </div> :
                    <b>Match Postponed</b>}
            </Card>
            <Card title={'Featured Results'} headStyle={{ textAlign: 'center' }} className={style.card}>
                {featuredResults.map((item: IDetails) =>
                    <>
                        <NavLink to={'/details/' + item.fixture_id}>
                            <Card className={style.featured} hoverable onClick={() => setFixtureData(item.fixture_id)}>
                                <p className={style.info}>
                                    <img src={item.homeTeam.logo} alt={'teamLogo'} className={style.logo} />
                                    {item.homeTeam.team_name} {item.goalsHomeTeam}
                                    <span> - </span>
                                    {item.goalsAwayTeam} {item.awayTeam.team_name}
                                    <img src={item.awayTeam.logo} alt={'teamLogo'} className={style.logo} />
                                </p>
                            </Card>
                        </NavLink>
                    </>,
                )}
            </Card>
        </>
    );
};

export default MatchDetail;