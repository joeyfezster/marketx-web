import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import HomePage from 'pages/home/HomePage';
import SigninPage from 'pages/auth/SigninPage';
import SignupPage from 'pages/auth/SignupPage';
import { store, persistor } from './store'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/signin" exact component={SigninPage} />
            <Route path="/signup" exact component={SignupPage} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
