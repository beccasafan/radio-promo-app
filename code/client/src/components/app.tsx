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
import { Search } from './search';

declare var google: any;

export interface AppState {
    countries: CountrySummary[];
    selectedCountry: CountrySummary;
    stations: StationSummary[];
    selectedStation: StationSummary;
    selectedStationDetails: StationDetail;
    search: SearchOptions;
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
            search: null
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
            this.setState({ stations: data });
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
                <Intro />
                {this.state.countries != null && (
                    <div>
                        <CountryDropdown countries={this.state.countries} onChange={this.countrySelected} />
                    </div>
                )}

                {this.state.selectedCountry && <Stations stations={this.state.stations} search={this.state.search} onSelect={this.stationSelected} />}

                {this.state.selectedStation && <Detail station={this.state.selectedStation} detail={this.state.selectedStationDetails} handleClose={this.stationUnselected} />}
            </div>
        );
    }
}