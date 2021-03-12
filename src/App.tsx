import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import HomePage from 'pages/home/HomePage';
import SigninPage from 'pages/auth/SigninPage';
import SignupPage from 'pages/auth/SignupPage';
import AppRoute from 'shared/route/AppRoute';
import { store, persistor } from './store'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="marketx-web">
          <Switch>
            <AppRoute path="/signin" component={SigninPage} />
            <AppRoute path="/signup" component={SignupPage} />
            <AppRoute restricted={true} path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
