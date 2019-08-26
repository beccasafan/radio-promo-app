import React, { Component, Dispatch, ChangeEvent } from "react";
import * as Bootstrap from 'src/bootstrap.scss';
import * as styles from './search.module.scss';

import Select2 from "src/components/ui/select2";
import { actions } from 'src/logic/search/search-redux';
import { connect } from "react-redux";
import { AppState } from "src/logic/store";
import { DataFormat, SearchOptions } from "select2";
import { setRouteData } from "src/route";
import { createSelector } from "reselect";
import { debounce } from 'throttle-debounce'
import { Artist, Song, shuffle } from "radio-app-2-shared";
import { setSong } from "src/logic/helpers/twitter";
import { actions as songActions } from 'src/logic/songs/songs-redux';
import Dropdown from "../countries/dropdown";

interface OwnProps {
    countryId: string;
}

interface StateProps {
    artists: Artist[];
    selectedArtist?: Artist;
    songs: Song[];
    selectedSong?: Song;
    formats: DataFormat[];
    format?: string;
    parentGroup?: string;
    location?: string;
    name?: string;
    talent?: string;
    twitter?: boolean;
    instagram?: boolean;
    facebook?: boolean;
    email?: boolean;
    text?: boolean;
    phone?: boolean;
    whatsapp?: boolean;
}

interface DispatchProps {
    loadSearchOptions: (countryId: string) => void;
    loadSongs: () => void;
}

interface State {
    parentGroup?: string;
    location?: string;
    name?: string;
    talent?: string;
    twitter?: boolean;
    instagram?: boolean;
    facebook?: boolean;
    email?: boolean;
    text?: boolean;
    phone?: boolean;
    whatsapp?: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;

const colClass = `${Bootstrap.colSm12} ${Bootstrap.colMd6} ${Bootstrap.colLg4} ${Bootstrap.formGroup}`;
const dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");

class Search extends Component<Props, State> {
    public readonly state: Readonly<State> = {
        parentGroup: this.props.parentGroup || "",
        location: this.props.location || "",
        name: this.props.name || "",
        talent: this.props.talent || "",
        twitter: this.props.twitter,
        instagram: this.props.instagram,
        facebook: this.props.facebook,
        email: this.props.email,
        text: this.props.text,
        phone: this.props.phone,
        whatsapp: this.props.whatsapp
    };

    onParentChangeDebounced: (searchValues: any) => void;
    onLocationChangeDebounced: (searchValues: any) => void;
    onNameChangeDebounced: (searchValues: any) => void;
    onTalentChangeDebounced: (searchValues: any) => void;
    ;
    constructor(props: Props) {
        super(props);
        const debounceDelay = 250;

        this.artistSelected = this.artistSelected.bind(this);
        this.songSelected = this.songSelected.bind(this);

        this.onFormatChange = this.onFormatChange.bind(this);
        this.onFormatClear = this.onFormatClear.bind(this);

        this.onParentChange = this.onParentChange.bind(this);
        this.onParentChangeDebounced = debounce(debounceDelay, this.onParentSearch.bind(this));

        this.onLocationChange = this.onLocationChange.bind(this);
        this.onLocationChangeDebounced = debounce(debounceDelay, this.onLocationSearch.bind(this));

        this.onNameChange = this.onNameChange.bind(this);
        this.onNameChangeDebounced = debounce(debounceDelay, this.onNameSearch.bind(this));

        this.onTalentChange = this.onTalentChange.bind(this);
        this.onTalentChangeDebounced = debounce(debounceDelay, this.onTalentSearch.bind(this));

        this.onTwitterChange = this.onTwitterChange.bind(this);
        this.onInstagramChange = this.onInstagramChange.bind(this);
        this.onFacebookChange = this.onFacebookChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onWhatsappChange = this.onWhatsappChange.bind(this);
    }

    componentDidMount() {
        this.props.loadSearchOptions(this.props.countryId);
        this.props.loadSongs();
    }
    componentDidUpdate(prevProps: Props) {
        if (prevProps.countryId !== this.props.countryId) {
            this.props.loadSearchOptions(this.props.countryId);
            this.props.loadSongs();
        }

        if (prevProps.parentGroup !== this.props.parentGroup) {
            this.setState({ parentGroup: this.props.parentGroup || "" });
        }

        if (prevProps.location !== this.props.location) {
            this.setState({ location: this.props.location || "" });
        }

        if (prevProps.name !== this.props.name) {
            this.setState({ name: this.props.name || "" });
        }

        if (prevProps.talent !== this.props.talent) {
            this.setState({ talent: this.props.talent || "" });
        }
        if (prevProps.twitter !== this.props.twitter) {
            this.setState({ twitter: this.props.twitter });
        }
        if (prevProps.instagram !== this.props.instagram) {
            this.setState({ instagram: this.props.instagram });
        }
        if (prevProps.facebook !== this.props.facebook) {
            this.setState({ facebook: this.props.facebook });
        }
        if (prevProps.email !== this.props.email) {
            this.setState({ email: this.props.email });
        }
        if (prevProps.text !== this.props.text) {
            this.setState({ text: this.props.text });
        }
        if (prevProps.phone !== this.props.phone) {
            this.setState({ phone: this.props.phone });
        }
        if (prevProps.whatsapp !== this.props.whatsapp) {
            this.setState({ whatsapp: this.props.whatsapp });
        }
    }

    onFormatChange(e: any) {
        const format = e.params.data as DataFormat;
        setRouteData({ format: format.id, page: null });
    }
    onFormatClear(e: any) {
        setRouteData({ format: null, page: null });
    }
    onParentChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ parentGroup: e.target.value }, () => this.onParentChangeDebounced(this.state.parentGroup));
    }
    onParentSearch(parentGroup: string) {
        setRouteData({ parentGroup: parentGroup, page: null });
    }
    onLocationChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ location: e.target.value }, () => this.onLocationChangeDebounced(this.state.location));
    };
    onLocationSearch(location: string) {
        setRouteData({ location: location, page: null });
    }
    onNameChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ name: e.target.value }, () => this.onNameChangeDebounced(this.state.name));
    }
    onNameSearch(name: string) {
        setRouteData({ name: name, page: null });
    }
    onTalentChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ talent: e.target.value }, () => this.onTalentChangeDebounced(this.state.talent));
    }
    onTalentSearch(talent: string) {
        setRouteData({ talent: talent, page: null });
    }
    onTwitterChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ twitter: e.target.checked }, () => setRouteData({ twitter: this.state.twitter, page: null }));
    }

    onInstagramChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ instagram: e.target.checked }, () => setRouteData({ instagram: this.state.instagram, page: null }));
    }

    onFacebookChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ facebook: e.target.checked }, () => setRouteData({ facebook: this.state.facebook, page: null }));
    }

    onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ email: e.target.checked }, () => setRouteData({ email: this.state.email, page: null }));
    }

    onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ text: e.target.checked }, () => setRouteData({ text: this.state.text, page: null }));
    }

    onPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ phone: e.target.checked }, () => setRouteData({ phone: this.state.phone, page: null }));
    }

    onWhatsappChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ whatsapp: e.target.checked }, () => setRouteData({ whatsapp: this.state.whatsapp, page: null }));
    }

    formatSong(song: Song) {
        if (!song.id) {
            return song.text;
        }

        return `${song.title} - ${song.artist}`;
    }

    formatArtist(artist: Artist) {
        if (!artist.id) {
            return artist.text;
        }
        return artist.name;
    }

    songSelected(e: any) {
        var song = e.params.data as Song;
        setSong(song);
        setRouteData({ song: song.id, artist: song.oneD, page: undefined });
        return false;
    }

    artistSelected(e: any) {
        var artist = e.params.data as Artist;

        setRouteData({ artist: artist.id === "ot5" ? null : artist.code, song: undefined, page: undefined });
        return false;
    }

    matchArtists(params: SearchOptions, data: any) {
        if (params.term == null || params.term === '') {
            return data;
        }

        if (!data.name) {
            return null;
        }

        return data.name.toLowerCase().indexOf(params.term.toLowerCase()) > -1 ? data : null;
    }

    matchSongs(params: SearchOptions, data: any) {
        if (params.term == null || params.term === '') {
            return data;
        }

        if (!data.title) {
            return null;
        }

        return data.title.toLowerCase().indexOf(params.term.toLowerCase()) > -1 ? data : null;
    }

    matchFormats(params: SearchOptions, data: any) {
        if (params.term == null || params.term === '') {
            return data;
        }

        if (!data.text) {
            return null;
        }

        return data.text.toLowerCase().indexOf(params.term.toLowerCase()) > -1 ? data : null;
    }

    render() {
        return (
            <>
                <div className={`${Bootstrap.row} ${Bootstrap.mb3} emphasis`}>
                    <div className={colClass}>
                        <Select2
                            data={this.props.artists}
                            selectedData={this.props.selectedArtist}
                            dataAdapter={dataAdapter}
                            templateResult={this.formatArtist}
                            templateSelection={this.formatArtist}
                            events={{ "select2:select": this.artistSelected }}
                            containerCssClass="song-dropdown-select2"
                            matcher={this.matchArtists}
                        />
                    </div>
                    <div className={colClass}>
                        <Select2
                            data={this.props.songs}
                            selectedData={this.props.selectedSong}
                            dataAdapter={dataAdapter}
                            templateResult={this.formatSong}
                            templateSelection={this.formatSong}
                            events={{ "select2:select": this.songSelected }}
                            containerCssClass="song-dropdown-select2"
                            matcher={this.matchSongs}

                        />
                    </div>
                    <div className={colClass}>
                        <Dropdown />
                    </div>
                </div>
                <div>
                    <h5 className={`${Bootstrap.textCenter} ${styles.subheader} ${Bootstrap.fontWeightBold}`}>SEARCH OPTIONS</h5>
                </div>
                <div className={`${Bootstrap.row} ${Bootstrap.py3}`}>
                    <div className={colClass}>
                        <input type="text" className={Bootstrap.formControl} placeholder="Search by Location" value={this.state.location} onChange={this.onLocationChange} />
                    </div>
                    <div className={colClass}>
                        <input type="text" className={Bootstrap.formControl} placeholder="Search by Parent Network" value={this.state.parentGroup} onChange={this.onParentChange} />
                    </div>
                    <div className={colClass}>
                        <Select2
                            data={this.props.formats}
                            dataAdapter={dataAdapter}
                            selectedData={{ id: this.props.format }}
                            events={{
                                "select2:select": this.onFormatChange,
                                "select2:unselecting": this.onFormatClear
                            }}
                            placeholder="All Formats"
                            allowClear="true"
                            matcher={this.matchFormats}
                        />
                    </div>
                    <div className={colClass}>
                        <input type="text" className={Bootstrap.formControl} placeholder="Search by Call Sign / Name" value={this.state.name} onChange={this.onNameChange} />
                    </div>
                    <div className={colClass}>
                        <input type="text" className={Bootstrap.formControl} placeholder="Search by On-Air DJs / Shows" value={this.state.talent} onChange={this.onTalentChange} />
                    </div>
                    <div className={colClass}>
                        <div className={`${Bootstrap.row} ${Bootstrap.textCenter} ${styles.social} ${Bootstrap.noGutters} ${Bootstrap.h100} ${Bootstrap.alignItemsCenter}`}>
                            <div className={Bootstrap.col}>
                                <div className={`${Bootstrap.formCheck} ${Bootstrap.formCheckInline}`}>
                                    <input className={Bootstrap.formCheckInline} type="checkbox" id="twitter" checked={this.state.twitter} onChange={this.onTwitterChange} />
                                    <label className="form-check-label" htmlFor="twitter"><i className="fab fa-twitter"></i> </label>
                                </div>
                            </div>
                            <div className={Bootstrap.col}>
                                <div className={`${Bootstrap.formCheck} ${Bootstrap.formCheckInline}`}>
                                    <input className={Bootstrap.formCheckInline} type="checkbox" id="instagram" checked={this.state.instagram} onChange={this.onInstagramChange} />
                                    <label className="form-check-label" htmlFor="instagram"><i className="fab fa-instagram"></i> </label>
                                </div>
                            </div>
                            <div className={Bootstrap.col}>
                                <div className={`${Bootstrap.formCheck} ${Bootstrap.formCheckInline}`}>
                                    <input className={Bootstrap.formCheckInline} type="checkbox" id="facebook" checked={this.state.facebook} onChange={this.onFacebookChange} />
                                    <label className="form-check-label" htmlFor="facebook"><i className="fab fa-facebook"></i> </label>
                                </div>
                            </div>
                            <div className={Bootstrap.col}>
                                <div className={`${Bootstrap.formCheck} ${Bootstrap.formCheckInline}`}>
                                    <input className={Bootstrap.formCheckInline} type="checkbox" id="email" checked={this.state.email} onChange={this.onEmailChange} />
                                    <label className="form-check-label" htmlFor="email"><i className="fas fa-envelope"></i> </label>
                                </div>
                            </div>
                            <div className={Bootstrap.col}>
                                <div className={`${Bootstrap.formCheck} ${Bootstrap.formCheckInline}`}>
                                    <input className={Bootstrap.formCheckInline} type="checkbox" id="text" checked={this.state.text} onChange={this.onTextChange} />
                                    <label className="form-check-label" htmlFor="text"><i className="fas fa-comment"></i> </label>
                                </div>
                            </div>
                            <div className={Bootstrap.col}>
                                <div className={`${Bootstrap.formCheck} ${Bootstrap.formCheckInline}`}>
                                    <input className={Bootstrap.formCheckInline} type="checkbox" id="phone" checked={this.state.phone} onChange={this.onPhoneChange} />
                                    <label className="form-check-label" htmlFor="phone"><i className="fas fa-phone"></i> </label>
                                </div>
                            </div>
                            <div className={Bootstrap.col}>
                                <div className={`${Bootstrap.formCheck} ${Bootstrap.formCheckInline}`}>
                                    <input className={Bootstrap.formCheckInline} type="checkbox" id="whatsapp" checked={this.state.whatsapp} onChange={this.onWhatsappChange} />
                                    <label className="form-check-label" htmlFor="phone"><i className="fab fa-whatsapp"></i> </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Bootstrap.row}>
                    <div className={colClass}>
                        <button className={`clipboard ${Bootstrap.btn} ${Bootstrap.btnLink}`} style={{ "paddingLeft": "0" }} data-clipboard-text={window.location.href} data-placement="bottom" data-trigger="manual" data-title="Copied"><i className="fas fa-external-link-alt"></i>&nbsp;Copy Link to this Search</button>
                    </div>
                    <div className={Bootstrap.col}>
                        <p>
                            <a className={`${Bootstrap.btn} ${Bootstrap.btnLink}`} href="http://bit.ly/radiorequestform"><i className="fas fa-paper-plane"></i>&nbsp;Something missing or wrong? Submit it here!</a>
                        </p>
                    </div>
                </div>
            </>
        );
    }
}

const formatsSelector = (appState: AppState) => appState.search.formats;
const formatSelector = (appState: AppState) => appState.routes.format;
const getFormats = createSelector([formatsSelector, formatSelector], (formats, format) => formats.allIds.reduce((uniqueFormats, id) => {
    const f = formats.byId[id];
    if (uniqueFormats.find(uf => uf.id === f.code) == null) {
        uniqueFormats.push({ id: f.code, text: f.name, selected: f.code.toLowerCase() === format });
    }
    return uniqueFormats;
}, [{ id: "", text: "" }] as DataFormat[]));


const getArtists = (state: AppState) => state.songs.artists;
const getSelectedArtist = (state: AppState) => state.routes.artist;
const getSongs = (state: AppState) => state.songs.items;
const getSelectedSong = (state: AppState) => state.routes.song;

const artists = createSelector([getArtists, getSelectedArtist], (guys, artist) => {
    const data = guys.allIds.map(id => {
        const a = guys.byId[id];
        a.selected = artist != null && artist == a.id;
        return a;
    });

    return [{ id: "ot5", code: "ot5", name: "All" } as unknown as Artist, ...shuffle(data)];
}
);

const songs = createSelector([getSongs, getSelectedSong, getSelectedArtist], (songs, selectedSong, selectedArtist) => {
    let visibleSongs = songs.allIds.map(id => songs.byId[id])

    if (selectedArtist != null) {
        visibleSongs = visibleSongs.filter(s => s.oneD === selectedArtist);
    }

    return visibleSongs;
});

const selectedArtist = createSelector([getArtists, getSelectedArtist], (artists, a) => a != null ? artists.byId[a] : undefined);
const selectedSong = createSelector([songs, getSelectedSong], (songs, song) => {
    const s = song != null ? (songs.find(i => i.id === song) || songs[0]) : songs[0];
    setSong(s);

    return s;
})

function mapStateToProps(appState: AppState, ownProps: OwnProps): StateProps {
    return {
        artists: artists(appState),
        selectedArtist: selectedArtist(appState),
        songs: songs(appState),
        selectedSong: selectedSong(appState),

        formats: getFormats(appState),
        format: appState.routes.format,
        parentGroup: appState.routes.parentGroup,
        location: appState.routes.location,
        name: appState.routes.name,
        talent: appState.routes.talent,
        twitter: appState.routes.twitter,
        instagram: appState.routes.instagram,
        facebook: appState.routes.facebook,
        email: appState.routes.email,
        text: appState.routes.text,
        phone: appState.routes.phone,
        whatsapp: appState.routes.whatsapp
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: OwnProps): DispatchProps {
    return {
        loadSearchOptions: (countryId: string) => dispatch(actions.getSearchOptions.action(ownProps.countryId)),
        loadSongs: () => dispatch(songActions.getSongs.action())
    };
}
export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Search);