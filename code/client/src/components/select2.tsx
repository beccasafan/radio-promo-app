import * as React from 'react';
import * as $ from 'jquery';

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    select2(options?: any): any;
}

export class Select2 extends React.Component<any, object> {
    private el: HTMLElement;
    private $el: JQuery<HTMLElement>;
    
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
    
      render() {
        return (
            <div>
                <select className="select2" ref={el => this.el = el} />
            </div>
        )
      }
}