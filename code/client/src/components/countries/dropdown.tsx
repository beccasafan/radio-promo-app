import * as React from 'react';
import { Select2 } from './../select2';
import { CountrySummary } from '../../../../common/models/countrySummary';

export interface CountryDropdownProps {
    countries: CountrySummary[];
}
export interface CountryDropdownState {

}
export class CountryDropdown extends React.Component<CountryDropdownProps, CountryDropdownState> {
    constructor(props: CountryDropdownProps) {
        super(props);
        this.state = {};
    }

    formatCountry(country: any) {
        if (!country.id) {
            return country.text;
        }

        return (
            <span>{country.name} - {country.stations} stations</span>
        );
    }

    render() {
        var dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");
        console.log("dropdown data adapter", dataAdapter);
        return (
            <Select2 data={this.props.countries} templateResult={this.formatCountry} dataAdapter={dataAdapter} />
        );
    }
}