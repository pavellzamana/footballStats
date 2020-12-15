import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/rootReducer";
import { Layout, Button} from "antd";
import Preloader from "../common/preloader/Preloader";
import {setFeaturedResults, setFixture, setFixtureID} from "../../redux/actions";
import {IDetails, IMatches} from "../common/types/Type";
import {withRouter, useHistory} from "react-router-dom";
import MatchDetail from "./MatchDetail/MatchDetail";
import style from "./Details.module.css";

import moment from "moment";

const { Header } = Layout;

const DetailsWithRouter: React.FC<any> = (props) => {
    const fixtureDetails = useSelector((state: AppStateType) => state.details.fixture);
    const fixtureDate = useSelector<AppStateType, string>((state: AppStateType) => state.details.eventDate);
    const results = useSelector<AppStateType, IMatches[]>((state) => state.results.matches);
    const dispatch = useDispatch();
    const history = useHistory();
    const fixID: number = props.location.pathname.replace('/details/', '');
    const setFixtureData = (id: number) => {
        dispatch(setFixture(id));
    }
    if (!fixtureDetails.event_date) {
        setFixtureData(fixID);
    }

    useEffect(() => {
        dispatch(setFixtureID(fixID));
        // @ts-ignore
        dispatch(setFeaturedResults(results.filter((item: IDetails) =>
            moment.unix(item.event_timestamp).format("MMM Do YYYY") === fixtureDate)));
    }, [results]);

    return (
        <>
            <Header className={style.head}>
                <Button className={style.button} onClick={() => history.push('/')} >‹ Back to results page</Button>
            </Header>
            <div className={style.container}>
                {fixtureDetails.event_date ? <MatchDetail /> : <Preloader/>}
            </div>
        </>
    );
}

const MatchDetails = withRouter(DetailsWithRouter);

export default MatchDetails;