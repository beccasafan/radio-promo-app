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

    render() {
        return (
            <Select2 data={this.props.countries} />
        );
    }
}