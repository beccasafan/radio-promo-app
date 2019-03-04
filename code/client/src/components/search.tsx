import * as React from 'react'
import { SearchOptions, SearchValues } from '../../../common/models/search';
import { Select2 } from "./plugins/select2";
import { throttle, debounce } from 'throttle-debounce';

export interface SearchProps {
    options: SearchOptions;
    onSearch: (parameters: SearchValues) => void;
}

export interface SearchState {
    parentGroup: string;
    location: string;
    name: string;
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
            name: null
        };

        this.onFormatChange = this.onFormatChange.bind(this);
        this.onParentChange = this.onParentChange.bind(this);
        this.onParentChangeDebounced = debounce(250, this.props.onSearch.bind(this));

        this.onLocationChange = this.onLocationChange.bind(this);
        this.onLocationChangeDebounced = debounce(250, this.props.onSearch.bind(this));

        this.onNameChange = this.onNameChange.bind(this);
        this.onNameChangeDebounced = debounce(250, this.props.onSearch.bind(this));
    }

    onFormatChange(e: any) {
        this.props.onSearch({ selectedFormat: e.params.data.id as string });
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

    render() {
        var events = {
            "select2:select": this.onFormatChange
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

        return (
            <div className="row py-3">
                <div className={colClass}>
                    <Select2
                        width="100%"
                        data={[{ id: "", text: "" }].concat(uniqueFormats)}
                        events={events}
                        placeholder="All Formats"
                    />
                </div>
                <div className={colClass}>
                    <input type="text" className="form-control" placeholder="Search by Parent Network" value={this.state.parentGroup} onChange={this.onParentChange} />
                </div>
                <div className={colClass}>
                    <input type="text" className="form-control" placeholder="Search by Location" value={this.state.location} onChange={this.onLocationChange} aria-describedby="locationHelpBlock" />
                    <small id="locationHelpBlock" className="form-text text-muted">To search for a State/Province NY, try searching for ", NY"</small>
                </div>
                <div className={colClass}>
                    <input type="text" className="form-control" placeholder="Search by Name" value={this.state.name} onChange={this.onNameChange} aria-describedby="nameHelpBlock" />
                    <small id="nameHelpBlock" className="form-text text-muted">Can also search by call-sign.</small>
                </div>
            </div>
        );
    }
}