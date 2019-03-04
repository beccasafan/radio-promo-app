import * as React from 'react'
import { SearchOptions } from '../../../common/models/search';
import { Select2 } from "./plugins/select2";

export interface SearchProps {
    options: SearchOptions;
    onSearch: (parameters: SearchState) => void;
}

export interface SearchState {

}

export class Search extends React.Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);

        this.state = {};

        this.onFormatChange = this.onFormatChange.bind(this);
    }

    onFormatChange(e: any) {
        this.props.onSearch({ selectedFormat: e.params.data.id as string });
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

        return (
            <div>
                {this.props.options.formats &&
                    <Select2
                        width="100%"
                        data={[{id:"",text:""}].concat(uniqueFormats)}
                        events={events}
                        placeholder="Filter by format"
                    />}
            </div>
        );
    }
}