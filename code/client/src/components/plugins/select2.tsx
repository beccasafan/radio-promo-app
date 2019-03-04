import * as React from 'react';
import * as $ from 'jquery';
import * as select2 from 'select2';

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    select2(options?: any): any;
}

export class Select2 extends React.Component<any, object> {
    private el: HTMLSelectElement;
    private $el: JQuery<HTMLSelectElement>;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.$el = $(this.el);
        var props = Object.assign({}, this.props, { theme: "bootstrap4" });
        this.$el.select2(props);
        /*if (props.allowClear === true || props.allowClear === "true") {
            $("~ .select2-container .select2-selection__clear", this.el).on("click", (e) => { console.log(e); $(this.el).val('').trigger('change'); });
        }*/
        Object.keys(this.props.events).forEach(key => $(this.el).on(key, (e) => { this.props.events[key](e) }));
    }

    componentWillUnmount() {
        this.$el.select2('destroy');
    }

    render() {
        return (
            <div>
                <select className="select2 form-control" ref={el => this.el = el} />
            </div>
        )
    }
}