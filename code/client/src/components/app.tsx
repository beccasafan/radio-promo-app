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
import { SearchOptions, SearchValues } from '../../../common/models/search';
import classNames = require('classnames');
import { Tweet } from '../../../common/models/tweets/tweet';
import { Language } from '../../../common/models/language';
import { TweetsByLanguage } from '../../../common/models/tweets/tweets';
import { Util } from '../../../common/util/util';
import { TweetGenerator } from './tweetGenerator';
import { Talent } from '../../../common/models/talent/talent';
import { getJSON, IApiCall } from "./../../../common/util/api";

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
    renderCount: number;
}

export class App extends React.Component<object, AppState> {
    qs: { [key: string]: string };
    initialSearch: SearchValues;

    constructor(props: object) {
        super(props);

        this.qs = this.parseQuerystring(window.location.search.substr(1).split('&'));

        this.state = {
            countries: null,
            selectedCountry: null,
            stations: null,
            selectedStation: null,
            selectedStationDetails: null,
            search: null,
            tweets: null,
            tweetGenerator: null,
            renderCount: 0
        };

        this.initialSearch = {
            format: this.qs.format || "",
            parentGroup: this.qs.network || "",
            location: this.qs.location || "",
            name: this.qs.name || "",
            twitter: this.qs.twitter != null,
            instagram: this.qs.instagram != null,
            facebook: this.qs.facebook != null,
            email: this.qs.email != null,
            text: this.qs.text != null,
            phone: this.qs.phone != null,
        };
        this.countrySelected = this.countrySelected.bind(this);
        this.stationSelected = this.stationSelected.bind(this);
        this.stationUnselected = this.stationUnselected.bind(this);
        this.getTweetUrl = this.getTweetUrl.bind(this);
        this.onModalOpen = this.onModalOpen.bind(this);
        this.onModalClose = this.onModalClose.bind(this);

    }

    parseQuerystring(a: any) {
        if (a == "") return {};
        var b: any = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    }

    componentDidMount() {
        const renderCount = this.state.renderCount;
        getJSON({ directFunction: "getCountrySummaries", url: "?item=country&action=summarize" })
            .done((data: CountrySummary[]) => {
                this.setState({ countries: data });
                var country = (this.qs.country || "US").toLowerCase();
                var initialCountry = data.find(c => c.code.toLowerCase() === country);
                this.countrySelected(initialCountry);
            });
    }

    componentDidUpdate(prevProps: object, prevState: AppState) {
        if (prevState.selectedCountry != this.state.selectedCountry) {
            const newRenderCount = prevState.renderCount + 1;
            if (newRenderCount > 1) {
                this.initialSearch = {
                    format: "",
                    parentGroup: "",
                    location: "",
                    name: ""
                };
            }
            this.setState({renderCount: newRenderCount});
        }
    }

    countrySelected(country: CountrySummary) {
        this.setState({ selectedCountry: country });
        getJSON({ directFunction: "getStationsByCountry", parameters: [country.id], url: `?item=station&action=getByCountry&country=${country.id}` })
            .done((data: StationSummary[]) => {
                var languages = data.reduce((uniqueLanguages: string[], d) => {
                    if (uniqueLanguages.find(ul => ul === d.languageId) == null) {
                        uniqueLanguages.push(d.languageId);
                    }

                    return uniqueLanguages;
                }, []);

                getJSON({ directFunction: "getTweetsByLanguages", parameters: [languages], url: `?item=tweet&action=getByLanguages&languages=${languages}` })
                    .done((tweets: TweetsByLanguage) => {
                        let stations = Util.shuffle(data);

                        if (!Util.isEmpty(this.qs.country) && this.qs.country.toLowerCase() === country.id.toLowerCase() && !Util.isEmpty(this.qs.stations)) {
                            let move = (arr: Array<StationSummary>, from: number, to: number) => {
                                var a = arr.splice(from, 1);
                                arr.unshift(a[0]);
                            }
                            this.qs.stations.split(',').reverse().forEach((code: string) => {
                                code = code.trim().toLowerCase();
                                var index = stations.findIndex(station => station.code.toLowerCase() === code);
                                if (index > 0) {
                                    move(stations, index, 0);
                                }
                            })
                        }
                        this.setState({ stations: stations, tweets: tweets, tweetGenerator: new TweetGenerator(tweets) });
                    })

            });

        getJSON({ directFunction: "getSearchOptions", parameters: [country.id], url: `?item=search&action=get&country=${country.id}` })
            .done((data: SearchOptions) => { this.setState({ search: data }); });
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
        window.scrollTo(0, 0);
    }

    onModalClose(e: ModalEventHandler<HTMLDivElement>) {
        var stationElement = $(`#station_${this.state.selectedStation.id}`);

        window.scrollTo(0, stationElement.position().top);
    }
    getTweetUrl(station: StationSummary | Talent, languageId?: string) {
        var tweet = this.state.tweetGenerator.get(languageId || station.languageId, station.twitter);

        tweet = encodeURIComponent(tweet);
        var url = `https://twitter.com/intent/tweet?text=${tweet}`;
        return url;
    }


    render() {
        return (
            <div className={styles.app}>
                <div className="container">
                    <img src="https://beccasafan.github.io/radio-promo-app/code/client/dist/banner3_standard.jpg" className="img-fluid mb-5" alt="Radio Request Database" />

                    {this.state.countries == null && <p>Loading...</p>}

                    {this.state.countries != null && (
                        <div>
                            <CountryDropdown countries={this.state.countries} onChange={this.countrySelected} defaultCountry={this.qs.country || "US"} />
                        </div>
                    )}

                    {this.state.countries && !(this.state.stations || this.state.tweets) && <p>Loading...</p>}

                    {this.state.countries && this.state.selectedCountry && this.state.tweets && <Stations key={`${this.state.selectedCountry.id}_${Object.keys(this.state.tweets).join(",")}`} countryId={this.state.selectedCountry.id} stations={this.state.stations} search={this.state.search} onSelect={this.stationSelected} getTweetUrl={this.getTweetUrl} initialSearch={this.initialSearch} />}

                    {this.state.countries && this.state.stations && this.state.selectedStation && <Detail station={this.state.selectedStation} detail={this.state.selectedStationDetails} handleClose={this.stationUnselected} getTweetUrl={this.getTweetUrl} onModalOpen={this.onModalOpen} onModalClose={this.onModalClose} />}
                </div>
            </div>
        );
    }
}