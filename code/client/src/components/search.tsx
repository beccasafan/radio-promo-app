import * as React from 'react'
import { SearchOptions, SearchValues } from '../../../common/models/search';
import { Select2 } from "./plugins/select2";
import { throttle, debounce } from 'throttle-debounce';
import * as styles from "./../styles/app.scss";

export interface SearchProps {
    options: SearchOptions;
    onSearch: (parameters: SearchValues) => void;
    twitter: boolean;
}

export interface SearchState {
    parentGroup: string;
    location: string;
    name: string;
    twitter: boolean;
    instagram: boolean;
    facebook: boolean;
    email: boolean;
    text: boolean;
    phone: boolean;
}

export class Search extends React.Component<SearchProps, SearchState> {
    onParentChangeDebounced: (parameters: SearchValues) => void;
    onLocationChangeDebounced: (parameters: SearchValues) => void;
    onNameChangeDebounced: (parameters: SearchValues) => void;

    constructor(props: SearchProps) {
        super(props);

        this.state = {
            parentGroup: null,
            location: null,
            name: null,
            twitter: null,
            instagram: null,
            facebook: null,
            email: null,
            text: null,
            phone: null
        };

        this.onFormatChange = this.onFormatChange.bind(this);
        this.onFormatReset = this.onFormatReset.bind(this);

        this.onParentChange = this.onParentChange.bind(this);
        this.onParentChangeDebounced = debounce(250, this.props.onSearch.bind(this));

        this.onLocationChange = this.onLocationChange.bind(this);
        this.onLocationChangeDebounced = debounce(250, this.props.onSearch.bind(this));

        this.onNameChange = this.onNameChange.bind(this);
        this.onNameChangeDebounced = debounce(250, this.props.onSearch.bind(this));

        this.onTwitterChange = this.onTwitterChange.bind(this);
        this.onInstagramChange = this.onInstagramChange.bind(this);
        this.onFacebookChange = this.onFacebookChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
    }

    onFormatChange(e: any) {
        this.props.onSearch({ selectedFormat: e.params.data.id as string });
    }
    onFormatReset(e: any) {
        this.props.onSearch({ selectedFormat: null });
    }

    onParentChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ parentGroup: e.target.value }, () => {
            var parentGroup = this.state.parentGroup;

            this.onParentChangeDebounced({ selectedParent: parentGroup });
        });
    }

    onLocationChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ location: e.target.value }, () => {
            var location = this.state.location;

            this.onLocationChangeDebounced({ location: location });
        });
    }

    onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ name: e.target.value }, () => {
            var name = this.state.name;

            this.onNameChangeDebounced({ name: name });
        })
    }

    onTwitterChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onSearch({ twitter: e.target.checked });
    }

    onInstagramChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onSearch({ instagram: e.target.checked });
    }

    onFacebookChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onSearch({ facebook: e.target.checked });
    }

    onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onSearch({ email: e.target.checked });
    }

    onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onSearch({ text: e.target.checked });
    }

    onPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onSearch({ phone: e.target.checked });
    }

    render() {
        var events = {
            "select2:select": this.onFormatChange,
            "select2:unselecting": this.onFormatReset
        };

        if (this.props.options == null) {
            return (<div></div>);
        }

        const uniqueFormats = this.props.options.formats.reduce((uniqueFormats, f) => {
            if (uniqueFormats.find(uf => uf.id === f.code) == null) {
                uniqueFormats.push({ id: f.code, text: f.name });
            }

            return uniqueFormats;
        }, []);

        const colClass = "col-sm-12 col-md-6 col-lg-4 form-group";

        var dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");

        return (
            <div className="search">
                <div className="row py-3">
                    <div className={colClass}>
                        <Select2
                            width="100%"
                            data={[{ id: "", text: "All Formats" }, { id: "", text: "All Formats" }].concat(uniqueFormats)}
                            dataAdapter={dataAdapter}
                            events={events}
                            placeholder="All Formats"
                            allowClear="true"
                        />
                    </div>
                    <div className={colClass}>
                        <input type="text" className="form-control" placeholder="Search by Parent Network" value={this.state.parentGroup} onChange={this.onParentChange} />
                    </div>
                    <div className={colClass}>
                        <input type="text" className="form-control" placeholder="Search by Location" value={this.state.location} onChange={this.onLocationChange} aria-describedby="locationHelpBlock" />
                        <small id="locationHelpBlock" className="form-text text-muted">* To search for a State/Province NY, try searching for ", NY"</small>
                    </div>
                    <div className={colClass}>
                        <input type="text" className="form-control" placeholder="Search by Name" value={this.state.name} onChange={this.onNameChange} aria-describedby="nameHelpBlock" />
                        <small id="nameHelpBlock" className="form-text text-muted">* Can also search by call-sign.</small>
                    </div>
                    <div className={colClass}>
                        <div className="row text-center social no-gutters">
                            <div className="col">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="twitter" checked={this.state.twitter} onChange={this.onTwitterChange} />
                                    <label className="form-check-label" htmlFor="twitter"><i className="fab fa-twitter"></i> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="instagram" checked={this.state.instagram} onChange={this.onInstagramChange} />
                                    <label className="form-check-label" htmlFor="instagram"><i className="fab fa-instagram"></i> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="facebook" checked={this.state.facebook} onChange={this.onFacebookChange} />
                                    <label className="form-check-label" htmlFor="facebook"><i className="fab fa-facebook"></i> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="email" checked={this.state.email} onChange={this.onEmailChange} />
                                    <label className="form-check-label" htmlFor="email"><i className="fas fa-envelope"></i> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="text" checked={this.state.text} onChange={this.onTextChange} />
                                    <label className="form-check-label" htmlFor="text"><i className="fas fa-comment"></i> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="phone" checked={this.state.phone} onChange={this.onPhoneChange} />
                                    <label className="form-check-label" htmlFor="phone"><i className="fas fa-phone"></i> </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}