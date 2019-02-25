import * as React from 'react';
import { Station }  from "../../../../common/models/station";
import { Util } from '../../../../common/util/util';

export class StationSummary extends React.Component<object, Station> {
    constructor(props: object) {
        super(props);
        this.state = null;
    }

    render() {
        if (Util.isEmpty(this.state)) {
            return (
                <div>Loading station...</div>
            );
        }

        return (
            <div className="station-summary">
                {this.state.name}
            </div>
        )
    }
}

