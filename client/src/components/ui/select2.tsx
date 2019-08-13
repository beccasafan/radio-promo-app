import React from 'react';
import { Options, DataFormat } from 'select2';
require('select2/dist/js/select2.full.js');
import 'select2/dist/css/select2.min.css';
import $ from 'jquery';
declare global {
    interface Window {
        $: JQueryStatic;
    }
}

window.$ = $;

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    select2(options?: any): any;
}
class ArrayAdapter {
    constructor($element: JQuery<HTMLElement>, options: Options) { }
    addOptions(data: DataFormat[]) { }
    convertToOptions(data: DataFormat[]): DataFormat[] { return []; }
}
interface JQuery<TElement = HTMLElement> {
    find(arg: any): this;
    remove(selector?: string): this;
}

function getSelectionAdapter(usePlaceholder: boolean, useAllowClear: boolean) {
    const name = `select2/selection/customSelectionAdapter|${usePlaceholder}|${useAllowClear}`;
    if (($.fn.select2.amd.require as any)._defined[name]) {
        return $.fn.select2.amd.require(name);
    }

    (($.fn.select2.amd as any).define(name,
        ['select2/utils', 'select2/selection/single', 'select2/compat/containerCss', 'select2/selection/eventRelay', 'select2/selection/placeholder', 'select2/dropdown/hidePlaceholder', 'select2/selection/allowClear', 'select2/compat/query'],
        function (Utils: any, SingleSelection: any, ContainerCss: any, EventRelay: any, Placeholder: any, HidePlaceholder: any, AllowClear: any, Query: any) {
            let CustomSelectionAdapter = Utils.Decorate(SingleSelection, ContainerCss);
            CustomSelectionAdapter = Utils.Decorate(CustomSelectionAdapter, EventRelay);
            // CustomSelectionAdapter = Utils.Decorate(CustomSelectionAdapter, Query);

            if (usePlaceholder) {
                CustomSelectionAdapter = Utils.Decorate(CustomSelectionAdapter, Placeholder);
                CustomSelectionAdapter = Utils.Decorate(CustomSelectionAdapter, HidePlaceholder);
            }
            if (useAllowClear) {
                CustomSelectionAdapter = Utils.Decorate(CustomSelectionAdapter, AllowClear);
            }
            return CustomSelectionAdapter;
        }
    ));

    return $.fn.select2.amd.require(name);
}

function getDropdownAdapter() {
    const name = `select2/dropdown/customDropdownAdapter`;
    if (($.fn.select2.amd.require as any)._defined[name]) {
        return $.fn.select2.amd.require(name);
    }

    (($.fn.select2.amd as any).define(name, 
        ['select2/utils', 'select2/dropdown', 'select2/dropdown/attachBody', 'select2/dropdown/attachContainer', 'select2/dropdown/search', 'select2/dropdown/minimumResultsForSearch', 'select2/dropdown/closeOnSelect', 'select2/compat/dropdownCss'],
        function(Utils: any, DropdownAdapter: any, AttachBody: any, AttachContainer: any, DropdownSearch: any, MinimumResultsForSearch: any, CloseOnSelect: any, DropdownCss: any) {
            let CustomDropdownAdapter = Utils.Decorate(DropdownAdapter, AttachBody);
            //CustomDropdownAdapter = Utils.Decorate(CustomDropdownAdapter, AttachContainer);
            CustomDropdownAdapter = Utils.Decorate(CustomDropdownAdapter, DropdownSearch);
            CustomDropdownAdapter = Utils.Decorate(CustomDropdownAdapter, MinimumResultsForSearch);
            CustomDropdownAdapter = Utils.Decorate(CustomDropdownAdapter, CloseOnSelect);
            CustomDropdownAdapter = Utils.Decorate(CustomDropdownAdapter, DropdownCss);

            return CustomDropdownAdapter;
        }
    ));

    return $.fn.select2.amd.require(name);
}
(($.fn.select2.amd as any).define('select2/data/customDataAdapter', ['select2/data/array'], function (ArrayAdapter: typeof Function) {
    class CustomDataAdapter extends ArrayAdapter {
        $element: JQuery<HTMLSelectElement>;
        constructor($element: any, options: any) {
            super($element, options);
            this.$element = $element;
        }

        updateOptions(data: { data: DataFormat[] }) {
            this.$element.find("option").remove();
            const base: ArrayAdapter = (this as any) as ArrayAdapter;
            base.addOptions(base.convertToOptions(data.data));
            $(this.$element).trigger('selection:update', {
                data: data
            });
        }
    }
    return CustomDataAdapter;
}));

class Select2 extends React.Component<any, object> {
    private el!: HTMLSelectElement;
    private $el!: JQuery<HTMLSelectElement>;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.$el = $(this.el);
        var selectionAdapter = getSelectionAdapter(this.props.placeholder != null, this.props.allowClear != null);
        // var dropdownAdapter = getDropdownAdapter();
        this.$el.select2({ ...this.props, theme: "bootstrap4", selectionAdapter: selectionAdapter/*, dropdownAdapter: dropdownAdapter*/, width: "100%" });
        Object.keys(this.props.events).forEach(key => $(this.el).on(key, (e) => this.props.events[key](e)));
    }

    componentWillUnmount() {
        this.$el.select2('destroy');
    }

    componentDidUpdate(prevProps: any) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            var select2Data: any = $(this.el).data("select2");
            select2Data.dataAdapter.updateOptions(this.props);
            if (this.props.selectedData != null) {
                $(this.el).val(this.props.selectedData.id);
            }
            $(this.el).trigger("change");
        }
    }

    render() {
        return (
            <div>
                <select className="select2 form-control" ref={el => this.el = (el as HTMLSelectElement)} />
            </div>
        )
    }
}

export default Select2;