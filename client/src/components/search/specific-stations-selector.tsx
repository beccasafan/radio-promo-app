import React, { Component, MouseEventHandler } from 'react';
import { connect } from 'react-redux';
import { StationSummary } from 'radio-app-2-shared';
import { AppState } from 'src/logic/store';
import { createSelector } from 'reselect';
import Select2 from 'src/components/ui/select2';
import { SearchOptions } from 'select2';
import { Modal } from '../ui/modal/modal';
import ModalHeader from '../ui/modal/modal-header';
import { ModalBody } from '../ui/modal/modal-body';
import * as Bootstrap from 'src/bootstrap.scss';
import { ModalFooter } from '../ui/modal/modal-footer';
import { setRouteData } from 'src/route';
import { renderToStaticMarkup } from 'react-dom/server';

interface OwnProps {
    
}
interface StateProps {
    selectedStations?: StationSummary[];
    stations: StationSummary[];
}
interface State {
    show: boolean;
}

const dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");
class SpecificStationsSelector extends Component<StateProps, State> {
    private el!: HTMLElement;

    constructor(props: StateProps) {
        super(props);

        this.state = {show: false};

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.openModal = this.openModal.bind(this);
        this.save = this.save.bind(this);
    }

    openModal(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({show:true});
    }

    handleOpen() {
        $(this.el).find(".select2-search.select2-search--inline").css("width", "100%").find("input").css("width", "100%");
    }

    handleClose() {
        this.setState({show:false});
        console.log("handle close", this.props.selectedStations);
    }

    save() {
        const vals = $(this.el).find("select").val();
        setRouteData({stations: vals, page: undefined});
    }

    formatStation(station: StationSummary) {
        if (!station.id) {
            return station.text;
        }

        return $(renderToStaticMarkup(
            <div key={station.id}>
                <div>{station.name}</div>
                <div className={Bootstrap.small}>{station.location}</div>
            </div>
        ));
    }
    formatSelectedStation(station: StationSummary) {
        return station.id ? station.name : station.text;
    }

    matchStations(params: SearchOptions, data: any) {
        if (params.term == null || params.term === '') {
            return data;
        }

        if (!data.name) {
            return null;
        }

        const search = params.term.toLowerCase();
        return data.name.toLowerCase().indexOf(search) > -1 || data.code.toLowerCase().indexOf(search) > -1 ? data : null;
    }

    render() {
        return (
            <>
                <p>
                    <button className={`${Bootstrap.btn} ${Bootstrap.btnLink}`} style={{ "paddingLeft": "0" }} onClick={this.openModal}><i className="fas fa-link"></i>&nbsp;Show specific stations</button>
                </p>
                <div ref={el => this.el = el as HTMLElement}>
                    {this.state.show && 
                    <Modal handleClose={this.handleClose} events={{"shown.bs.modal": this.handleOpen}}>
                        <ModalHeader>
                            <h5 className={Bootstrap.modalTitle}>Select Stations</h5>
                            <a className={Bootstrap.close} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </a>
                        </ModalHeader>
                        <ModalBody>
                            <div className="emphasis">
                            <Select2
                                multiple="multiple"
                                data={this.props.stations}
                                dataAdapter={dataAdapter}
                                templateResult={this.formatStation}
                                templateSelection={this.formatSelectedStation}
                                selectedData={this.props.selectedStations}
                                placeholder="Force stations to the beginning"
                                allowClear="true"
                                matcher={this.matchStations}
                            />
                        </div>
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className={`${Bootstrap.btn} ${Bootstrap.btnSecondary}`} data-dismiss="modal">Close</button>
                            <button type="button" className={`${Bootstrap.btn} ${Bootstrap.btnPrimary}`} onClick={this.save}>Save</button>
                        </ModalFooter>
                    </Modal>
                    }
                </div>
            </>
        )
    }

};


const stations = createSelector([(state: AppState) => state.stations.items, (state: AppState) => state.routes.stations], (stations, selectedStations) => {
    const s = stations.allIds.map(id => {
        const station = stations.byId[id];
        station.selected = selectedStations != null && selectedStations.find(s => s == station.id);
        return station;
    });

    return s.sort((a,b) => a.name > b.name ? 1 : -1);
});

const selectedStations = createSelector([stations, (state: AppState) => state.routes.stations], (stations, selectedStations) => {
    if (selectedStations == null) { return undefined; }

    const selected = stations.filter(s => selectedStations.indexOf(s.id) >= 0);
    return selected;
});


function mapStateToProps(appState: AppState): StateProps {
    return {
        selectedStations: selectedStations(appState),
        stations: stations(appState)
    }
}
export default connect<StateProps, {}, {}, AppState>(mapStateToProps)(SpecificStationsSelector);