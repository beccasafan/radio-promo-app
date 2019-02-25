
import * as React from 'react';
import { Util } from "../../../../common/util/util";
import { Station } from "../../../../common/models/station";

declare var google: any;

export interface StationsProps {
    stations?: Station[]
};
export interface StationsState {
    stations: Station[];
}

export class Stations extends React.Component<StationsProps, StationsState> {
    constructor(props: StationsProps) {
        super(props);
        this.state = { stations: [] };
    }

    componentDidMount() {
        google.script.run.withSuccessHandler((data: Station[]) => {
            this.setState({ stations: data });
        }).getAllStations();
    }

    render() {
        if (Util.isEmpty(this.state.stations)) {
            return (
                <div>Loading stations...</div>
            );
        }
        return (
            <div>There are {this.state.stations.length} stations</div>
        );
    }
}