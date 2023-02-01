import React from 'react';
// Google Provider
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_CLIENT_ID}`}>
      <BrowserRouter>
        <Container maxwidth="lg">
          <Navbar />
          <Switch>
            <Route exact path="/" component={ () => <Redirect to="/posts" />} />
            <Route exact path="/posts">
              <Home />
            </Route>
            <Route exact path="/posts/search">
              <Home />
            </Route>
            <Route exact path="/posts/:id">
              <PostDetails />
            </Route>
            <Route exact path="/auth" component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} /> 
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App;