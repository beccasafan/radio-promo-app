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
}

export class Search extends React.Component<SearchProps, SearchState> {
    onParentChangeDebounced: (parameters: SearchValues) => void;

    constructor(props: SearchProps) {
        super(props);

        this.state = {
            parentGroup: null
        };

        this.onFormatChange = this.onFormatChange.bind(this);
        this.onParentChange = this.onParentChange.bind(this);
        this.onParentChangeDebounced = debounce(250, this.props.onSearch.bind(this));
    }

    onFormatChange(e: any) {
        this.props.onSearch({ selectedFormat: e.params.data.id as string });
    }

    onParentChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ parentGroup: e.target.value }, () => {
            var parentGroup = this.state.parentGroup;

            this.onParentChangeDebounced({selectedParent: parentGroup});
        });
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

        const colClass = "col md-6 lg-4";

        return (
            <div className="row py-3 form-group">
                <div className={colClass}>
                    <Select2
                        width="100%"
                        data={[{ id: "", text: "" }].concat(uniqueFormats)}
                        events={events}
                        placeholder="All Formats"
                    />
                </div>
                <div className={colClass}>
                    <input type="text" className="form-control" placeholder="" value={this.state.parentGroup} onChange={this.onParentChange} />
                </div>
            </div>
        );
    }
}