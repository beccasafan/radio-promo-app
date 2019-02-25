
import * as React from 'react';
import { Util } from "../../../../common/util/util";
import { CountrySummary } from "../../../../common/models/countrySummary";
//import "../../styles/app.scss";
import * as styles from './../../styles/app.scss';
import classNames from 'classnames';

export interface SummaryProps {
    country: CountrySummary;
}

export class Summary extends React.Component<SummaryProps, object> {
    constructor(props: SummaryProps) {
        super(props);
        this.state = {};
    }

    render() {
        var imageCode = this.props.country.code.toLowerCase();
        if (imageCode === "uk") {
            imageCode = "gb";
        }

        return (
            <div className="col-sm-4">
                <div className="card">
                    <img className="card-img-top" src={`http://files.stevenskelton.ca/flag-icon/flag-icon/svg/country-4x3/${imageCode}.svg`} alt="Card image cap" />
                    <div className="card-img-overlay">
                        <h5 className="card-title">{this.props.country.name}</h5>
                        <p className="card-text">{this.props.country.stations} stations</p>
                        <a href="#" className={classNames("btn", "btn-primary", styles.test)}>View</a>
                    </div>
                </div>
            </div>
        );
    }
}