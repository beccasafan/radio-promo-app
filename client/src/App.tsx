import React from 'react';
import { Provider } from 'react-redux';
import { store } from './logic/store';
import { Switch, Route, RouteComponentProps, BrowserRouter, HashRouter } from 'react-router-dom';
import Stations from './pages/stations';
import { actions, reducer } from 'src/logic/routes/routes-redux';
import { UrlParams } from './logic/routes/route-models';

const SetRouteData = (routeParams: RouteComponentProps<UrlParams>) => {
  const urlParams: UrlParams & {[key: string]: string} = {};
  new URLSearchParams(routeParams.location.search.replace("#/", "")).forEach((v,k) => urlParams[k] = v);
  store.dispatch(actions.getFromRoute({...urlParams, history: routeParams.history }));
}


const App = () => (
  <Provider store={store}>
    <BrowserRouter >
      <Switch>
        <Route path="/" render={(routeInfo: RouteComponentProps<UrlParams>) => {
          SetRouteData(routeInfo);
          return (<Stations />);
        }} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
export default App;