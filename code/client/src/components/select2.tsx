import * as React from 'react';
import * as $ from 'jquery';
import * as select2 from 'select2';

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    select2(options?: any): any;
}


class ArrayAdapter {
    constructor($element: JQuery<HTMLElement>, options: select2.Options) { }
    addOptions(data: select2.DataFormat[]) { }
}
interface JQuery<TElement = HTMLElement> {
    find(arg: any): this;
    remove(selector?: string): this;
    append(...contents: Array<JQuery.htmlString | JQuery.TypeOrArray<JQuery.Node | JQuery<JQuery.Node>>>): this;
}

(($.fn.select2.amd as any).define('select2/data/customDataAdapter', ['select2/data/array'], function (ArrayAdapter: typeof Function) {
    class CustomDataAdapter extends ArrayAdapter {
        $element: JQuery<HTMLElement>;
        constructor($element: any, options: any) {
            super($element, options);
            this.$element = $element;
        }

        updateOptions(data: select2.DataFormat[]) {
            this.$element.find("option").remove();
            data.map(d => new Option(d.text, d.id.toString(), null, d.selected)).forEach(d => this.$element.append(d));;
        }
    }
}));

export class Select2 extends React.Component<any, object> {
    private el: HTMLElement;
    private $el: JQuery<HTMLElement>;

    public static defaultProps = {
        dataAdapter: $.fn.select2.amd.require("select2/data/customDataAdapter")
    }

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.select2(this.props);
    }

    componentWillUnmount() {
        this.$el.select2('destroy');
    }

    componentDidUpdate(prevProps: any) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            ($(this.el).data('select2') as any).dataAdapter.updateOptions(this.props);
            $(this.el).trigger("change");
        }
    }

    render() {
        return (
            <div>
                <select className="select2" ref={el => this.el = el} />
            </div>
        )
    }
}

