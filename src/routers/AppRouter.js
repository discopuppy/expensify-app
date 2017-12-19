import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
    // React-Router is creating 'browser history' behind the scenes and registering
    // it with <BrowserRouter>, uses the browser history by default,
    // but with createHistory we are forcing in our own history to manipulate routes
    // <Router> allows us to provide our own history prop.

    // Basically, Private Route and Public Route are like we are passing through a
    // filter which manipulates the user experience
);

export default AppRouter;