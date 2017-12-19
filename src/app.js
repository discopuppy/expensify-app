import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) { // if hasRendered is not true
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}; // makes sure app only renders a single time

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        }); // will only fetch expenses if someone is logged in        
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
}); // works through Firebases API
// passes in 'user', if 'user' is true
// then user is logged in if 'user
// is false then user is logged out.



// addExpense -> Water Bill
// Gas Bill
// setTextFilter -> bill
// getVisibleExpenses -> print visible ones to screen

//store.dispatch(setTextFilter(''));

//store.dispatch(addExpense({ description: 'Water Bill', amount: 4500 }));
//store.dispatch(addExpense({ description: 'Gas Bill', createdAt: 1000 }));
//store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));


//const state = store.getState();
//const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//console.log(visibleExpenses);