import React, { Component } from 'react';
import BootstrapStyles from 'src/bootstrap.scss';
import { AppState } from 'src/logic/store';
import { Artist } from "radio-app-2-shared";
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

declare var publicUrl: string;

interface StateProps {
    selectedArtist?: Artist;
    theme: string;
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps;

class Header extends Component<Props> {
    constructor(props: Props) {
        super(props)

    }

    componentDidMount() {
        this.setTheme(undefined, this.props.theme);
    }

    componentDidUpdate(prevProps: Props) {
        this.setTheme(prevProps.theme, this.props.theme);
    }
    
    setTheme(oldTheme: string | undefined, newTheme: string) {
        if (oldTheme != newTheme) {
            const body = document.getElementsByTagName("body")[0];
            if (oldTheme) {
                body.classList.remove(oldTheme);
            }

            body.classList.add(newTheme);
        }
    }

    render() {
        return (
            <div className={`${BootstrapStyles.mb5}`}>
                <img src={`${publicUrl}/${this.props.theme}.jpg`} alt="Radio Request Database" className={`${BootstrapStyles.imgFluid}`} />
            </div>
        );
    }
}

const getArtists = (state: AppState) => state.songs.artists;
const getSelectedArtist = (state: AppState) => state.routes.artist;
const selectedArtist = createSelector([getArtists, getSelectedArtist], (artists, a) => a != null ? artists.byId[a] : undefined);

const mapStateToProps = (state: AppState): StateProps => {
    const artist = selectedArtist(state);
    return ({
        selectedArtist: artist,
        theme: artist != null ? artist.id : "ot5"
    });
};

const mapDispatchToProps: DispatchProps = {

};

export default connect<StateProps, DispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(Header);