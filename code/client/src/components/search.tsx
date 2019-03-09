import * as React from 'react'
import { SearchOptions, SearchValues } from '../../../common/models/search';
import { Select2 } from "./plugins/select2";
import { throttle, debounce } from 'throttle-debounce';
import * as styles from "./../styles/app.scss";
import { Util } from '../../../common/util/util';
import { Format } from '../../../common/models/formats/format';

export interface SearchProps {
    countryId: string;
    options: SearchOptions;
    onSearch: (parameters: SearchValues) => void;
    twitter: boolean;
    initialSearch: SearchValues;
}

export interface SearchState {
    format?: string;
    parentGroup?: string;
    location?: string;
    name?: string;
    twitter?: boolean;
    instagram?: boolean;
    facebook?: boolean;
    email?: boolean;
    text?: boolean;
    phone?: boolean;
}
declare var baseUrl: string;

export class Search extends React.Component<SearchProps, SearchState> {
    onParentChangeDebounced: (parameters: SearchValues) => void;
    onLocationChangeDebounced: (parameters: SearchValues) => void;
    onNameChangeDebounced: (parameters: SearchValues) => void;

    constructor(props: SearchProps) {
        super(props);

        this.state = {
            format: null,
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

    componentDidMount() {
        this.loadSearch(this.props.initialSearch);
    }

    private loadSearch(search: SearchValues) {
        let hasAValue =
            !Util.isEmpty(search.format) ||
            !Util.isEmpty(search.parentGroup) ||
            !Util.isEmpty(search.location) ||
            !Util.isEmpty(search.name)
            ;

        this.setState(search);

        this.props.onSearch(search);
    }

    componentDidUpdate(prevProps: SearchProps, prevState: SearchState) {
        if (prevProps.initialSearch != this.props.initialSearch) {
            this.loadSearch(this.props.initialSearch);
        }
    }

    onFormatChange(e: any) {
        this.setState({ format: e.params.data.id }, () => {
            this.props.onSearch({ format: e.params.data.id as string });
        });
    }
    onFormatReset(e: any) {
        this.setState({ format: null }, () => {
            this.props.onSearch({ format: null });
        });
    }

    onParentChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ parentGroup: e.target.value }, () => {
            var parentGroup = this.state.parentGroup;

            this.onParentChangeDebounced({ parentGroup: parentGroup });
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
        this.setState({ twitter: e.target.checked }, () => this.props.onSearch({ twitter: this.state.twitter }));
    }

    onInstagramChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ instagram: e.target.checked }, () => this.props.onSearch({ instagram: this.state.instagram }));
    }

    onFacebookChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ facebook: e.target.checked }, () => this.props.onSearch({ facebook: this.state.facebook }));
    }

    onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ email: e.target.checked }, () => this.props.onSearch({ email: this.state.email }));
    }

    onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ text: e.target.checked }, () => this.props.onSearch({ text: this.state.text }));
    }

    onPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ phone: e.target.checked }, () => this.props.onSearch({ phone: this.state.phone }));
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
                uniqueFormats.push({ id: f.code, text: f.name, selected: f.code.toLowerCase() === this.props.initialSearch.format });
            }

            return uniqueFormats;
        }, []);

        const colClass = "col-sm-12 col-md-6 col-lg-4 form-group";

        const dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");
        let addUrlParam = (key: string, value: string, allowEmpty: boolean = false) => { 
            if (allowEmpty) {
                if (value != null) {
                    url += `&${key}${!Util.isEmpty(value) ? `=${value}` : ""}`;
                }
            } else if (!Util.isEmpty(value)) {
                url += `&${key}=${encodeURIComponent(value.toLowerCase())}`; 

            }
        };
        let url = baseUrl + (baseUrl.indexOf("?") >= 0 ? "&" : "?");
        addUrlParam("country", this.props.countryId);
        addUrlParam("format", this.state.format);
        addUrlParam("network", this.state.parentGroup);
        addUrlParam("location", this.state.location);
        addUrlParam("name", this.state.name);
        addUrlParam("twitter", this.state.twitter ? "" : null, true);
        addUrlParam("instagram", this.state.instagram ? "" : null, true);
        addUrlParam("facebook", this.state.facebook ? "" : null, true);
        addUrlParam("email", this.state.email ? "" : null, true);
        addUrlParam("text", this.state.text ? "" : null, true);
        addUrlParam("phone", this.state.phone ? "" : null, true);

        url = url.replace(/\?\&/, "?").replace(/\&\&/, "&");

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
                        <input type="text" className="form-control" placeholder="Search by Location" value={this.state.location} onChange={this.onLocationChange} />
                    </div>
                    <div className={colClass}>
                        <input type="text" className="form-control" placeholder="Search by Call-Sign / Name" value={this.state.name} onChange={this.onNameChange} />
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
                <div><button className="clipboard btn btn-link" style={{"paddingLeft": "0"}} data-clipboard-text={url} data-placement="bottom" data-trigger="manual" data-title="Copied"><i className="fas fa-external-link-alt"></i>&nbsp;Copy Link to this Search</button></div>
            </div>
        );
    }
}