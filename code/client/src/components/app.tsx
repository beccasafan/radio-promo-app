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
import { Util } from '../../../common/util/util';
import { TweetGenerator } from './tweetGenerator';
import { Talent } from '../../../common/models/talent/talent';

declare var google: any;

export interface AppState {
    countries: CountrySummary[];
    selectedCountry: CountrySummary;
    stations: StationSummary[];
    selectedStation: StationSummary;
    selectedStationDetails: StationDetail;
    search: SearchOptions;
    tweets: TweetsByLanguage;
    tweetGenerator: TweetGenerator;
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
            tweets: null,
            tweetGenerator: null
        };

        this.countrySelected = this.countrySelected.bind(this);
        this.stationSelected = this.stationSelected.bind(this);
        this.stationUnselected = this.stationUnselected.bind(this);
        this.getTweetUrl = this.getTweetUrl.bind(this);
        this.onModalOpen = this.onModalOpen.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
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
                this.setState({stations: Util.shuffle(data), tweets: tweets, tweetGenerator: new TweetGenerator(tweets)});
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

    onModalOpen(e: ModalEventHandler<HTMLDivElement>) {
        console.log("open", e);
        window.scrollTo(0, 0);
    }
    
    onModalClose(e: ModalEventHandler<HTMLDivElement>) {
        console.log("close", e);
        var stationElement = $(`#station_${this.state.selectedStation.id}`);

        window.scrollTo(0, stationElement.position().top);
    }
    getTweetUrl(station: StationSummary|Talent, languageId?: string) {
        var tweet = this.state.tweetGenerator.get(languageId || station.languageId, station.twitter);

        tweet = encodeURIComponent(tweet);
        var url = `https://twitter.com/intent/tweet?text=${tweet}`;
        return url;
    }


    render() {
        return (
            <div className={styles.app}>
                <div className="container">
                    <img src="https://beccasafan.github.io/radio-promo-app/code/client/dist/banner2_standard.jpg" className="img-fluid mb-5" alt="Radio Request Database" />
                    
                    {this.state.countries == null && <p>Loading...</p>}

                    {this.state.countries != null && (
                        <div>
                            <CountryDropdown countries={this.state.countries} onChange={this.countrySelected} defaultCountry="US" />
                        </div>
                    )}

                    {this.state.countries && !(this.state.stations || this.state.tweets) && <p>Loading...</p>}

                    {this.state.countries && this.state.selectedCountry && this.state.tweets && <Stations key={`${this.state.selectedCountry.id}_${Object.keys(this.state.tweets).join(",")}`} countryId={this.state.selectedCountry.id} stations={this.state.stations} search={this.state.search} onSelect={this.stationSelected} getTweetUrl={this.getTweetUrl} />}

                    {this.state.countries && this.state.stations && this.state.selectedStation && <Detail station={this.state.selectedStation} detail={this.state.selectedStationDetails} handleClose={this.stationUnselected} getTweetUrl={this.getTweetUrl} onModalOpen={this.onModalOpen} onModalClose={this.onModalClose} />}
                </div>
            </div>
        );
    }
}