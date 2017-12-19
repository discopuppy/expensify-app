import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )}/>
);
// if isAuthenticated is true      is returned
// if isAuthenticated is false the user is Redirected to "/" or login screen

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid 
    // if state.auth.uid is true then it exists and the user is signed in 
    // and authenticated.

    // !! flips it to it's boolean value so that if state.auth.uid is false,
    // it won't translate to undefined, it will translate to false
});

export default connect(mapStateToProps)(PrivateRoute);