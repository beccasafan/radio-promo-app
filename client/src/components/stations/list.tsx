import React from 'react';
import { StationSummary } from "radio-app-2-shared";
import { Component } from "react";
import { AppState } from "src/logic/store";
import { actions } from "src/logic/stations/stations-redux";
import { actions as tweetActions } from "src/logic/tweets/tweets-redux";
import { connect } from "react-redux";
import NormalizedEntity from 'src/logic/helpers/normalized-entity';
import { Dispatch } from 'redux';
import Clipboard from 'clipboard';
import Bootstrap from 'src/bootstrap.scss';

import Search from 'src/components/search/search';
import VisibleList from './filtered-list';

interface StateProps {
    countryId: string;
    stations: NormalizedEntity<StationSummary>;
    isLoading: boolean;
    hasError: boolean;
}
interface DispatchProps {
    loadStations: (countryId: string) => void;
    loadTweets: () => void;
}

type Props = StateProps & DispatchProps;

export class List extends Component<Props> {
    private el!: HTMLElement | null;
    private $el!: JQuery<HTMLDivElement>;
    private clipboard!: Clipboard;
    
    constructor(props: Props) {
        super(props);
    }
    componentDidMount() {
        this.props.loadStations(this.props.countryId);

        this.$el = $(this.el!) as JQuery<HTMLDivElement>;
        this.clipboard = new Clipboard(".clipboard");
        var tooltip = this.$el.find(".clipboard").tooltip({ delay: { show: 500, hide: 0}});
        this.clipboard.on("success", (e: any) => {
            let tooltip = $(e.trigger);
            $(e.trigger).tooltip("show");
            tooltip.on("blur mouseleave", () => tooltip.tooltip("hide"));
        });
    }

    componentWillUnmount() {
        if (this.clipboard != null) {
            this.clipboard.destroy();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.countryId !== this.props.countryId) {
            this.props.loadStations(this.props.countryId);
        }
        else if (prevProps.isLoading && !this.props.isLoading) {
            this.props.loadTweets();
        }
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div>Loading stations...</div>
            );
        } else if (this.props.stations.allIds.length == 0) {
            return (
                <div>No results...</div>
            )
        }

        return (
            <div ref={el => this.el = el}>
                <Search countryId={this.props.countryId} />
                
                <VisibleList items={this.props.stations} />
            </div>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        countryId: state.routes.country || "US",
        stations: state.stations.items,
        isLoading: state.stations.isLoading,
        hasError: state.stations.hasError
    };
}
const mapDispatchToProps: DispatchProps = {
    loadStations: (countryId: string) => actions.getStationsByCountry.action(countryId),
    loadTweets: () => (dispatch: Dispatch, getState: () => AppState, extraArgument: any) => {
        const stations = getState().stations.items;

        var languages = stations.allIds.reduce((uniqueLanguages: string[], d) => {
            const languageId = stations.byId[d].languageId;
            if (uniqueLanguages.find(ul => ul === languageId) == null) {
                uniqueLanguages.push(languageId);
            }

            return uniqueLanguages;
        }, []);

        return tweetActions.getTweetsByLanguage.action(languages)(dispatch, () => getState().tweets, extraArgument);
    }
}

export default connect<StateProps, DispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(List);