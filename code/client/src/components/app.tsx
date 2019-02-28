import * as React from 'react';
import { Intro } from './intro';
import { CountryDropdown } from './countries/dropdown';
import { CountrySummary } from '../../../common/models/countries/countrySummary';
import { Stations } from "./stations/list";
import { StationSummary } from '../../../common/models/stations/stationSummary';
import * as styles from "./../styles/app.scss";

declare var google: any;

export interface AppState {
    countries: CountrySummary[];
    selectedCountry: CountrySummary;
    stations: StationSummary[];
}

export class App extends React.Component<object, AppState> {
    constructor(props: object) {
        super(props);
        this.state = {
            countries: null,
            selectedCountry: null,
            stations: null
        };
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
    }

    render() {
        return (
            <div className={styles.app}>
                <Intro />
                {this.state.countries != null && <CountryDropdown countries={this.state.countries} onChange={this.countrySelected.bind(this)} />}

                {this.state.selectedCountry != null && <Stations stations={this.state.stations} />}
            </div>
        );
    }
}