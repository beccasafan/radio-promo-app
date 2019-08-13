import React, { Component } from "react";

interface OwnProps {
    utcOffset: number;
}

interface State {
    time: Date;
}
export default class Time extends Component<OwnProps, State> {
    state: Readonly<State> = {
        time: new Date()
    };
    private timeout?: number;

    constructor(props: OwnProps) {
        super(props);
    }

    tick() {
        const local = new Date();
        const utc = local.getTime() + (local.getTimezoneOffset() * 60 * 1000);
        const station = utc + (this.props.utcOffset * 60 * 60 * 1000);

        this.setState({ time: new Date(station) });

        return window.setTimeout(() => {
            this.timeout = this.tick();
        }, 60000);
    }

    componentDidMount() {
        this.timeout = this.tick();
    }
    componentDidUpdate(prevProps: OwnProps) {
        if (prevProps.utcOffset != this.props.utcOffset) {
            clearTimeout(this.timeout);
            this.timeout = this.tick();
        }
    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <span>{this.state.time.toLocaleString(undefined, { weekday: "short", hour: "numeric", minute: "numeric" })}</span>
        )
    }
}