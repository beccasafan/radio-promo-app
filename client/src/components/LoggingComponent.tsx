import React, { Component, ComponentType, ComponentClass } from "react";

export function withLogging<T extends object>(WrappedComponent: ComponentType<T>) {
    return (
        class LoggingComponent extends Component<T, any> {
            static readonly displayName = `Logging (${WrappedComponent.displayName || WrappedComponent.name || "Component" })`;
            private log(...params: any[]) {
                console.log.apply(console, [WrappedComponent.displayName || WrappedComponent.name || 'Component', ...params]);
            }
            constructor(props: any) {
                super(props);
                this.log("Creating", props);
            }

            componentDidMount() {
                this.log("ComponentDidMount");
            }
            componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
                this.log("ComponentDidUpdate", {prevProps, props: this.props, prevState, state: this.state, snapshot});
            }
            render() {
                this.log("Render");

                return (<WrappedComponent {...this.props} />);
            }
        }
    );
}