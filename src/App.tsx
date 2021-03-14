import SigninPage from 'pages/auth/SigninPage';
import SignupPage from 'pages/auth/SignupPage';
import GroupDealPage from 'pages/groupDeal/GroupDealPage';
import HomePage from 'pages/home/HomePage';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoute from 'shared/route/AppRoute';
import routePaths from 'shared/routePaths';
import { fetcher } from 'shared/utils/swrHooks/swrFetcher';
import { SWRConfig } from 'swr';
import { persistor, store } from './store';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig
          value={{
            fetcher,
          }}
        >
          <BrowserRouter basename="marketx-web">
            <Switch>
              <AppRoute path={routePaths.SIGNIN} component={SigninPage} />
              <AppRoute path={routePaths.SIGNUP} component={SignupPage} />
              <AppRoute restricted={true} path={routePaths.GROUP_DEAL} component={GroupDealPage} />
              <AppRoute restricted={true} path="/" component={HomePage} />
            </Switch>
          </BrowserRouter>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
