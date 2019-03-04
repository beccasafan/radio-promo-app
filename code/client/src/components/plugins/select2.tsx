import * as React from 'react';
import * as $ from 'jquery';
import * as select2 from 'select2';

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    select2(options?: any): any;
}

class ArrayAdapter {
    constructor($element: JQuery<HTMLElement>, options: select2.Options) { }
    addOptions(data: select2.DataFormat[]) { }
    convertToOptions(data: select2.DataFormat[]): select2.DataFormat[] { return null; }
}
interface JQuery<TElement = HTMLElement> {
    find(arg: any): this;
    remove(selector?: string): this;
}

(($.fn.select2.amd as any).define('select2/data/customDataAdapter', ['select2/data/array'], function (ArrayAdapter: typeof Function) {
    class CustomDataAdapter extends ArrayAdapter {
        $element: JQuery<HTMLSelectElement>;
        constructor($element: any, options: any) {
            super($element, options);
            this.$element = $element;
        }

        updateOptions(data: { data: select2.DataFormat[] }) {
            this.$element.find("option").remove();
            const base: ArrayAdapter = (this as any) as ArrayAdapter;
            base.addOptions(base.convertToOptions(data.data));
        }
    }
    return CustomDataAdapter;
}));

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

    componentDidUpdate(prevProps: any) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            var select2Data: any = $(this.el).data("select2");
            var dataAdapter = select2Data.dataAdapter;
            dataAdapter.updateOptions(this.props);
            $(this.el).val(this.props.defaultValue);
            $(this.el).trigger("change");
        }
    }

    render() {
        return (
            <div>
                <select className="select2 form-control" ref={el => this.el = el} />
            </div>
        )
    }
}