import * as React from 'react';
import { Select2 } from './../plugins/select2';
import { CountrySummary } from '../../../../common/models/countries/countrySummary';
import { renderToStaticMarkup } from 'react-dom/server';
import * as styles from "./../../styles/country.scss";

export interface CountryDropdownProps {
    countries: CountrySummary[];
    defaultCountry: string;
    onChange: (country: CountrySummary) => void;
}
export interface CountryDropdownState {
    selectedCountry: CountrySummary;
}
export class CountryDropdown extends React.Component<CountryDropdownProps, CountryDropdownState> {
    constructor(props: CountryDropdownProps) {
        super(props);
        this.state = {
            selectedCountry: null
        };

        this.countrySelected = this.countrySelected.bind(this);
    }

    formatCountry(country: CountrySummary) {
        if (!country.id) {
            return country.text;
        }

        var imageCode = country.code.toLowerCase();
        if (imageCode === "uk") {
            imageCode = "gb";
        }

        return $(renderToStaticMarkup(
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

        return $(renderToStaticMarkup(
            <span key={country.id} className={styles.countrySelector}>
                <img className="mr-3" src={`http://files.stevenskelton.ca/flag-icon/flag-icon/svg/country-4x3/${imageCode}.svg`} alt="Card image cap" />
                <span>{country.name}</span>
            </span>
        ));
    }

    countrySelected(e: any) {
        var country = e.params.data as CountrySummary;
        this.props.onChange(country);
    }

    render() {
        var events = {
            "select2:select": this.countrySelected
        };

        var defaultCountry = this.props.countries.find(c => c.id === this.props.defaultCountry);
        defaultCountry.selected = true;

        return (
            <Select2
                width="100%"
                data={this.props.countries}
                templateResult={this.formatCountry}
                templateSelection={this.formatCountrySelection}
                events={events}
                containerCssClass="country-dropdown-select2"
            />
        );
    }
}