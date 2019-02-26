import * as React from 'react';
import { Select2 } from './../select2';
import { CountrySummary } from '../../../../common/models/countrySummary';
import * as ReactDOMServer from 'react-dom/server';
import * as styles from "./../../styles/country.scss";

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

    formatCountry(country: CountrySummary) {
        if (!country.id) {
            return country.text;
        }

        var imageCode = country.code.toLowerCase();
        if (imageCode === "uk") {
            imageCode = "gb";
        }

        return $(ReactDOMServer.renderToStaticMarkup(
            <span key={country.id} className={styles.countrySelector}>
                <img className="mr-3" src={`http://files.stevenskelton.ca/flag-icon/flag-icon/svg/country-4x3/${imageCode}.svg`} alt="Card image cap" />
                <span>{country.name} - {country.stations} stations</span>
            </span>
        ));
    }

    formatCountrySelection(country: CountrySummary) {
        if (!country.id) {
            return country.text;
        }

        var imageCode = country.code.toLowerCase();
        if (imageCode === "uk") {
            imageCode = "gb";
        }

        return $(ReactDOMServer.renderToStaticMarkup(
            <span key={country.id} className={styles.countrySelector}>
                <img className="mr-3" src={`http://files.stevenskelton.ca/flag-icon/flag-icon/svg/country-4x3/${imageCode}.svg`} alt="Card image cap" />
                <span>{country.name}</span>
            </span>
        ));
    }

    countrySelected(country: CountrySummary) {
        console.log("Country Selected", country);
    }

    render() {
        var dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");
        var events = {
            "select2:select": this.countrySelected
        };

        return (
            <Select2
                width="100%"
                data={this.props.countries}
                templateResult={this.formatCountry}
                templateSelection={this.formatCountrySelection}
                dataAdapter={dataAdapter}
                events={events}
            />
        );
    }
}