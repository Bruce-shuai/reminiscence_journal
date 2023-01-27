import React from 'react';
// Google Provider
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_CLIENT_ID}`}>
      <BrowserRouter>
        <Container maxwidth="lg">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/auth">
              <Auth />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App;