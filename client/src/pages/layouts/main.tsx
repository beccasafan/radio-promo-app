import React, { ReactNode, Component } from 'react';
import Dropdown from 'src/components/countries/dropdown';
import Header from 'src/components/ui/header';
import BootstrapStyles from 'src/bootstrap.scss';
import { connect } from 'react-redux';
import { AppState } from 'src/logic/store';
import UserGuide from 'src/components/user-guide/user-guide';

interface OwnProps {
    children: ReactNode;
}
interface StateProps {
    artist: string;
    userGuide: boolean;
}
type Props = OwnProps & StateProps;

const MainLayout = (props: Props) => (
    <div id="app" className={props.artist}>
        <div className={`${BootstrapStyles.container} `}>
            <Header />
            
            {props.children}

            {props.userGuide && 
                <UserGuide />
            }
        </div>
    </div>
);

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => (
    {
        artist: state.routes.artist || "ot5",
        userGuide: state.routes.userGuide
    });
export default connect<StateProps, {}, OwnProps, AppState>(mapStateToProps)(MainLayout);