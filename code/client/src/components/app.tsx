import * as React from 'react';
import { Intro } from './intro';
import { CountryDropdown } from './countries/dropdown';
import { CountrySummary } from '../../../common/models/countries/countrySummary';
import { Stations } from "./stations/list";
import { StationSummary } from '../../../common/models/stations/stationSummary';
import * as styles from "./../styles/app.scss";
import { Detail } from './stations/detail';
import { StationDetail } from '../../../common/models/stations/stationDetail';
import { ModalEventHandler } from 'bootstrap';
import { SearchOptions } from '../../../common/models/search';
import classNames = require('classnames');
import { Tweet } from '../../../common/models/tweets/tweet';
import { Language } from '../../../common/models/language';
import { TweetsByLanguage } from '../../../common/models/tweets/tweets';

declare var google: any;

export interface AppState {
    countries: CountrySummary[];
    selectedCountry: CountrySummary;
    stations: StationSummary[];
    selectedStation: StationSummary;
    selectedStationDetails: StationDetail;
    search: SearchOptions;
    tweets: TweetsByLanguage;
}

export class App extends React.Component<object, AppState> {
    constructor(props: object) {
        super(props);
        this.state = {
            countries: null,
            selectedCountry: null,
            stations: null,
            selectedStation: null,
            selectedStationDetails: null,
            search: null,
            tweets: null
        };

        this.countrySelected = this.countrySelected.bind(this);
        this.stationSelected = this.stationSelected.bind(this);
        this.stationUnselected = this.stationUnselected.bind(this);
    }

    componentDidMount() {
        google.script.run.withSuccessHandler((data: CountrySummary[]) => {
            this.setState({ countries: data });
            this.countrySelected(data.find(c => c.code === "US"));
        }).getCountrySummaries();
    }

    countrySelected(country: CountrySummary) {
        this.setState({ selectedCountry: country });

        google.script.run.withSuccessHandler((data: StationSummary[]) => {
            var languages = data.reduce((uniqueLanguages: string[], d) => {
                if (uniqueLanguages.find(ul => ul === d.languageId) == null) {
                    uniqueLanguages.push(d.languageId);
                }

                return uniqueLanguages;
            }, []);

            google.script.run.withSuccessHandler((tweets: TweetsByLanguage) => {
                this.setState({stations: data, tweets: tweets});
            }).getTweetsByLanguage(languages);

        }).getStationsByCountry(country.id);

        google.script.run.withSuccessHandler((data: SearchOptions) => {
            this.setState({ search: data })
        }).getSearchOptions(country.id);
    }

    stationSelected(station: StationSummary) {
        this.setState({ selectedStation: station });

        google.script.run.withSuccessHandler((data: StationDetail) => {
            this.setState({ selectedStationDetails: data });
        }).getStation(station.code);
    }

    stationUnselected(e: ModalEventHandler<HTMLDivElement>) {
        this.setState({ selectedStation: null, selectedStationDetails: null });
    }

    render() {
        return (
            <div className={styles.app}>
                <div className="container">
                    <Intro />
                    {this.state.countries != null && (
                        <div>
                            <CountryDropdown countries={this.state.countries} onChange={this.countrySelected} defaultCountry="US" />
                        </div>
                    )}

                    {this.state.selectedCountry && this.state.tweets && <Stations key={this.state.selectedCountry.id} countryId={this.state.selectedCountry.id} stations={this.state.stations} search={this.state.search} onSelect={this.stationSelected} tweets={this.state.tweets} />}

                    {this.state.selectedStation && <Detail station={this.state.selectedStation} detail={this.state.selectedStationDetails} handleClose={this.stationUnselected} />}
                </div>
            </div>
        );
    }
}