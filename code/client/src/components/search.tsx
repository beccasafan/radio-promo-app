import * as React from 'react'
import { SearchOptions } from '../../../common/models/search';
import { Select2 } from "./plugins/select2";
import { FormatSummary } from '../../../common/models/formats/formatSummary';
import { renderToStaticMarkup } from 'react-dom/server';
import { StationSummary } from '../../../common/models/stations/stationSummary';

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
        //var dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");
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
                        data={uniqueFormats}
                        //dataAdapter={dataAdapter}
                        events={events}
                    />}
            </div>
        );
    }
}