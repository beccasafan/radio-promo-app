import * as React from 'react';

export class Intro extends React.Component<object, object> {
    constructor(props: object) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Radio Promo App</h1>
                <p className="lead">Explain things here...</p>
                <hr className="my-1" />
                <p>Maybe some more text here 3</p>
            </div>
        );
    }
}