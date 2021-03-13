import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import HomePage from 'pages/home/HomePage';
import SigninPage from 'pages/auth/SigninPage';
import SignupPage from 'pages/auth/SignupPage';
import AppRoute from 'shared/route/AppRoute';
import GroupDealPage from 'pages/groupDeal/GroupDealPage'
import { store, persistor } from './store'
import { SWRConfig } from 'swr';
import { fetcher } from 'shared/utils/swrHooks/swrFetcher';
import routePaths from 'shared/routePaths';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig
          value={{
            fetcher,
            revalidateOnFocus: false,
          }}
        >
          <BrowserRouter basename="marketx-web">
            <Switch>
              <AppRoute path={routePaths.SIGNIN} component={SigninPage} />
              <AppRoute path={routePaths.SIGNUP} component={SignupPage} />
              <AppRoute restricted={true} path="/" component={HomePage} />
              <AppRoute restricted={true} path={routePaths.GROUP_DEAL} component={GroupDealPage} />
            </Switch>
          </BrowserRouter>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
