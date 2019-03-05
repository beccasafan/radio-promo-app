import * as React from 'react';
import { StationSummary } from '../../../../common/models/stations/stationSummary';
import { Search } from '../search';
import { SearchValues } from '../../../../common/models/search';
import { Summary } from './summary';
import { TweetsByLanguage } from '../../../../common/models/tweets/tweets';
import { TweetGenerator } from '../tweetGenerator';

export interface FilteredListProps {
    countryId: string;
    stations: StationSummary[];
    onSelect: (station: StationSummary) => void;
    onSearch: (values: SearchValues) => void;
    tweets: TweetsByLanguage;
}
export interface FilteredListState {

}

export class FilteredList extends React.Component<FilteredListProps, FilteredListState> {
    tweetGenerator: TweetGenerator;
    constructor(props: FilteredListProps) {
        super(props);

        this.state = {};

        this.getTweetUrl = this.getTweetUrl.bind(this);
    }

    getTweetUrl(station: StationSummary) {
        if (this.tweetGenerator == null) {
            this.tweetGenerator = new TweetGenerator(this.props.tweets);
        }
        var tweet = this.tweetGenerator.get(station.languageId, station.twitter);

        tweet = encodeURIComponent(tweet);
        var url = `https://twitter.com/intent/tweet?text=${tweet}`;
        return url;
    }

    render() {
        if (this.props.stations == null) {
            return (
                <div>Loading stations...</div>
            );
        } else if (this.props.stations.length == 0) {
            return (
                <div>No results...</div>
            )
        }

        const result = (
            <div key={this.props.countryId} className="row">
                {this.props.stations.map(s => <Summary key={s.id} station={s} onSelect={this.props.onSelect} getTweetUrl={this.getTweetUrl} />)}
            </div>
        );

        return result;
    }
}