import * as React from 'react';
import { Intro } from './intro';
import { CountryDropdown } from './countries/dropdown';
import { CountrySummary } from '../../../common/models/countrySummary';

declare var google: any;

export interface AppState {
    countries: CountrySummary[];
}

export class App extends React.Component<object, AppState> {
    constructor(props: object) {
        super(props);
        this.state = {} as AppState;
    }

    componentDidMount() {
        google.script.run.withSuccessHandler((data: CountrySummary[]) => {
            this.setState({ countries: data });
        }).getCountrySummaries();
    }

    render() {
        return (
            <div>
                <Intro />
                <CountryDropdown countries={this.state.countries} />
            </div>
        );
    }
}