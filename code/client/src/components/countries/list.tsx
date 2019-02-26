
import * as React from 'react';
import { Util } from "../../../../common/util/util";
import { Country } from "../../../../common/models/countries/country";
import { Summary } from "./summary"
import { CountrySummary } from '../../../../common/models/countries/countrySummary';

declare var google: any;

export interface CountriesProps {
    countries?: Country[]
};
export interface CountriesState {
    countries: CountrySummary[];
}

export class Countries extends React.Component<CountriesProps, CountriesState> {
    constructor(props: CountriesProps) {
        super(props);
        this.state = { countries: [] };
    }

    componentDidMount() {
        google.script.run.withSuccessHandler((data: CountrySummary[]) => {
            this.setState({ countries: data });
        }).getCountrySummaries();
    }

    render() {
        if (Util.isEmpty(this.state.countries)) {
            return (
                <div>Loading countries...</div>
            );
        }
        return (
            <div className="row">
                {this.state.countries.map(c => <Summary key={c.id} country={c} />)}
            </div>
        );
    }
}