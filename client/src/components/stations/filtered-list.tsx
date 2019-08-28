import React, { Component, Dispatch } from 'react';
import NormalizedEntity, { INormalizableEntity } from 'src/logic/helpers/normalized-entity';
import { Format, StationSummary, shuffle } from 'radio-app-2-shared';
import { connect } from 'react-redux';
import Summary from './summary';
import * as bs from 'src/bootstrap.scss';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { AppState } from 'src/logic/store';
import Nav from '../ui/nav';

import { setRouteData } from 'src/route';
import Detail from './detail';
import { withLogging } from '../LoggingComponent';
import NormalizedTweetsByLanguage from 'src/logic/tweets/tweet-models';

import isEqual from 'lodash.isequal';

interface OwnProps {
    items: NormalizedEntity<StationSummary>;
}

interface StateProps {
    stations: StationSummary[];
    totalStations: number;
    page: number;
    pageSize: number;
    station?: StationSummary;
    selectedArtist?: string;
}

interface DispatchProps {
    onPreviousClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    onNextClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class VisibleStations extends Component<Props> {
    render() {
        const navProps = {page: this.props.page, pageSize: this.props.pageSize, totalItems: this.props.totalStations, onNextClick: this.props.onNextClick, onPreviousClick: this.props.onPreviousClick};
        return (
            <>
                <Nav description="Top" {...navProps} />

                {this.props.stations && 
                    <div className={bs.row}>
                        {this.props.stations.map(station => <Summary key={station.id} station={station} artist={this.props.selectedArtist} />)}
                    </div>
                }

                {!this.props.stations && <p className={bs.textCenter}>No results...</p>}
                <Nav description="Bottom" {...navProps} />

                {this.props.station && <Detail id={this.props.station.id} />}
            </>
        )
    }
}

const itemsSelector = (state: AppState, props: OwnProps) => props.items;
const pageSelector = (state: AppState, props: OwnProps) => state.routes.page || 1;
const pageSizeSelector = (state: AppState, props: OwnProps) => state.routes.pageSize || 24;

const formatSelector = (state: AppState) => state.routes.format;
const formatsSelector = (state: AppState) => state.search.formats;

const parentGroupSelector = (state: AppState) => state.routes.parentGroup;
const locationSelector = (state: AppState) => state.routes.location;
const nameSelector = (state: AppState) => state.routes.name;
const talentSelector = (state: AppState) => state.routes.talent;

const twitterSelector = (state: AppState) => state.routes.twitter;
const instagramSelector = (state: AppState) => state.routes.instagram;
const facebookSelector = (state: AppState) => state.routes.facebook;
const emailSelector = (state: AppState) => state.routes.email;
const textSelector = (state: AppState) => state.routes.text;
const phoneSelector = (state: AppState) => state.routes.phone;
const whatsappSelector = (state: AppState) => state.routes.whatsapp;

const selectedStationSelector = (state: AppState) => state.routes.station;
const selectedStationsSelector = (state: AppState) => state.routes.stations;

const socialSelector = createSelector(
    [twitterSelector, instagramSelector, facebookSelector, emailSelector, textSelector, phoneSelector, whatsappSelector],
    (twitter, instagram, facebook, email, text, phone, whatsapp) => ({ twitter, instagram, facebook, email, text, phone, whatsapp })
);

const matchesFormat = (station: StationSummary, selectedFormat: string) => {
    return selectedFormat === station.formatId;
}
const matchesText = (stationText: string, selectedText: string | undefined) => {
    return !selectedText || (stationText && stationText.toLowerCase().indexOf(selectedText!.toLowerCase()) >= 0);
};
const matchesArrayText = (stationValues: string[], selectedText: string | undefined) => {
    return !selectedText || (stationValues != null && stationValues.some(i => i.toLowerCase().indexOf(selectedText!.toLowerCase()) >= 0));
};
const matchesBool = (stationValue: string, selectedValue: boolean | undefined) => {
    return !selectedValue || stationValue;
};

const x = createSelectorCreator(defaultMemoize, isEqual);

const searchStations = x(
    [itemsSelector, formatSelector, parentGroupSelector, locationSelector, nameSelector, talentSelector, socialSelector],
    (items, format, parentGroup, location, name, talent, socials): StationSummary[] => {
        console.log("shuffling", items, format, parentGroup, location, name, talent, socials);
        const stations = shuffle(items
            .allIds
            .filter(id => {
                const station = items.byId[id];
                return (!format || matchesFormat(station, format!)) 
                    && matchesText(station.parentGroup, parentGroup)
                    && matchesText(station.location, location)
                    && (matchesText(station.name, name) || matchesText(station.code, name))
                    && (matchesArrayText(station.talentNames, talent))
                    && matchesBool(station.twitter, socials.twitter)
                    && matchesBool(station.instagram, socials.instagram)
                    && matchesBool(station.facebook, socials.facebook)
                    && matchesBool(station.email, socials.email)
                    && matchesBool(station.text, socials.text)
                    && matchesBool(station.phone, socials.phone)
                    && matchesBool(station.whatsapp, socials.whatsapp)
                ;
            })
            .map(id => items.byId[id]))
        ;

        return stations;
    }
);

const getStations = x(
    [searchStations, selectedStationSelector, selectedStationsSelector],
    (stations, selectedStation, selectedStations) => {
        if (selectedStations != null) {
            [...selectedStations].reverse().forEach(station => {
                const s = stations.findIndex(st => st.id == station);
                if (s >= 0) {
                    const moveToFront = stations.splice(s, 1)[0];
                    stations.unshift(moveToFront);
                }
            });
        }

        if (selectedStation != null) {
            const s = stations.findIndex(st => st.id == selectedStation);
            if (s >= 0) {
                const moveToFront = stations.splice(s, 1)[0];
                stations.unshift(moveToFront);
            }
        }
        
        return stations;
    }
)

const getPageOfStations = x(
    [getStations, pageSelector, pageSizeSelector],
    (items, page, pageSize): StationSummary[] => items.slice(((page - 1) * pageSize), (page * pageSize))
);
const getTotalStations = x([getStations], (items): number => items.length);

function mapStateToProps(appState: AppState, ownProps: OwnProps): StateProps {
    return { 
        stations: getPageOfStations(appState, ownProps),
        totalStations: getTotalStations(appState, ownProps),
        page: appState.routes.page || 1,
        pageSize: appState.routes.pageSize || 24,
        station: appState.routes.station ? appState.stations.items.byId[appState.routes.station] : undefined,
        selectedArtist: appState.routes.artist
    };
}

const mapDispatchToProps = {
    onNextClick: (event: React.MouseEvent<HTMLAnchorElement>) => (dispatch: Dispatch<any>, getState: () => AppState, extraArgument: any) => {
        event.preventDefault();
        setRouteData({page: (getState().routes.page || 1)+1});
    },
    onPreviousClick: (event: React.MouseEvent<HTMLAnchorElement>) => (dispatch: Dispatch<any>, getState: () => AppState, extraArgument: any) => {
        event.preventDefault();
        setRouteData({page: (getState().routes.page || 1)-1});
    }
};


export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(VisibleStations);