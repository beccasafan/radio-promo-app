import * as React from 'react'
import { SearchOptions } from '../../../common/models/search';
import { Select2 } from "./plugins/select2";
import { FormatSummary } from '../../../common/models/formats/formatSummary';
import { renderToStaticMarkup } from 'react-dom/server';
import { StationSummary } from '../../../common/models/stations/stationSummary';

export interface SearchProps {
    options: SearchOptions;
    stations: JSX.Element[];
}
export interface SearchState {
    selectedFormat: string;
}

export class Search extends React.Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);

        this.state = {
            selectedFormat: null
        };

        this.search = this.search.bind(this);
    }

    formatFormat(format: FormatSummary) {
        if (!format.id) {
            return format.text;
        }

        return $(renderToStaticMarkup(
            <span key={format.id}>
                <span>{format.monitor} {format.name}</span>
            </span>
        ));
    }

    formatSelected(e: any) {
        this.setState({selectedFormat: e.params.data.id as string });
        this.search();
    }

    search() {
        const visibleItems: JSX.Element[] = [];
        const hiddenItems: JSX.Element[] = []
        if (this.state.selectedFormat != null) {
            this.props.stations.forEach(s => {
                var format = this.props.options.formats.find(f => f.id === s.props.station.formatId);
                var isVisible = this.state.selectedFormat === format.code;

                (isVisible ? visibleItems : hiddenItems).push(s);
            });

            visibleItems.forEach(i => i.props.visible = true);
            hiddenItems.forEach(i => i.props.visible = false);
        }
    }

    render() {
        var dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");
        var events = {
            "select2:select": this.search
        };

        if (this.props.options == null) {
            return (<div></div>);
        }
        return (
            <div>
                {this.props.options.formats && 
                    <Select2
                        width="100%"
                        data={this.props.options.formats.map(f => ({id: f.code, text: f.name })).filter((value, index, array)=>array.indexOf(value)==index)}
                        //templateResult={this.formatFormat}
                        //templateSelection={this.formatFormat}
                        dataAdapter={dataAdapter}
                        events={events}
                    />}
            </div>
        );
    }
}