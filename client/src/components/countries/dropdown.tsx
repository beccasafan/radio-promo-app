import React, { Component } from 'react';
import Select2 from 'src/components/ui/select2';
import { renderToStaticMarkup } from 'react-dom/server';
import * as styles from "src/components/countries/countries.module.scss";
import * as bootstrapStyles from "src/bootstrap.scss";
import { CountrySummary } from 'radio-app-2-shared';
import { AppState } from 'src/logic/store';
import NormalizedEntity from 'src/logic/helpers/normalized-entity';
import { connect } from 'react-redux';
import { actions } from "src/logic/countries/countries-redux";
import { setRouteData } from 'src/route';
import * as test1 from './test1.module.css'; import * as test2 from './test2.css';
import { OptGroupData, OptionData, SearchOptions } from 'select2';

interface StateProps {
    countries: NormalizedEntity<CountrySummary>;
    selectedCountry: CountrySummary | undefined;
    isLoading: boolean;
    hasError: boolean;
}
interface DispatchProps { 
    loadCountries: () => void;
}

type Props = StateProps & DispatchProps;

class Dropdown extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.countrySelected = this.countrySelected.bind(this);
    }

    componentDidMount() {
        this.props.loadCountries();
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
                {/* <img className={bootstrapStyles.mr3} src={`http://files.stevenskelton.ca/flag-icon/flag-icon/svg/country-4x3/${imageCode}.svg`} alt="Card image cap" /> */}
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
                {/* <img className={bootstrapStyles.mr3} src={`http://files.stevenskelton.ca/flag-icon/flag-icon/svg/country-4x3/${imageCode}.svg`} alt="Card image cap" /> */}
                <span>{country.name}</span>
            </span>
        ));
    }

    countrySelected(e: any) {
        var country = e.params.data as CountrySummary;
        setRouteData({country: country.id, page: undefined});
        return false;
    }

    matchCountries(params: SearchOptions, data: any) {
        if (params.term == null || params.term === '') {
            return data;
        }

        if (!data.name) {
            return null;
        }

        if (data.name.toLowerCase().indexOf(params.term.toLowerCase()) > -1) {
            return data;
        }
        else {
            return null;
        }

    }
    
    render() {
        const dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");
        
        const events = {
            "select2:select": this.countrySelected,
        };

        const results = this.props.countries.allIds.map(id => {
            const country = this.props.countries.byId[id];
            country.selected = this.props.selectedCountry != null && this.props.selectedCountry.id === id;

            return country;
        });

        if (this.props.isLoading) {
            return (<div>Loading countries...</div>);
        }

        return (
            this.props.countries.allIds.length > 0 && 
            <Select2
                data={results}
                selectedData={this.props.selectedCountry}
                dataAdapter={dataAdapter}
                templateResult={this.formatCountry}
                templateSelection={this.formatCountrySelection}
                events={events}
                containerCssClass="country-dropdown-select2"
                matcher={this.matchCountries}
            />
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        countries: state.countries.items,
        selectedCountry: state.countries.items.allIds.length > 0 ? state.countries.items.byId[state.routes.country || "US"] : undefined,
        isLoading: state.countries.isLoading,
        hasError: state.countries.hasError
    }
}
const mapDispatchToProps: DispatchProps = {
    loadCountries: () => actions.getCountries.action(),
};

export default connect<StateProps, DispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(Dropdown);