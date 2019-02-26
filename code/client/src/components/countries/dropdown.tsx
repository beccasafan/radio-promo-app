import * as React from 'react';
import { Select2 } from './../select2';
import { CountrySummary } from '../../../../common/models/countrySummary';
import * as ReactDOMServer from 'react-dom/server';

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

        var imageCode = country.code.toLowerCase();
        if (imageCode === "uk") {
            imageCode = "gb";
        }

        return $(ReactDOMServer.renderToStaticMarkup(
            <span key={country.id}>
                <img className="mr3" src={`http://files.stevenskelton.ca/flag-icon/flag-icon/svg/country-4x3/${imageCode}.svg`} alt="Card image cap" />
                <span>{country.name} - {country.stations} stations</span>
            </span>
        ));
    }

    render() {
        var dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");
        console.log("dropdown data adapter", dataAdapter);
        return (
            <Select2 data={this.props.countries} templateResult={this.formatCountry} dataAdapter={dataAdapter} />
        );
    }
}