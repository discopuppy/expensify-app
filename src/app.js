import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
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

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});

firebase.auth().onAuthStateChanged((user) => { // works through Firebases API
                                            // passes in 'user', if 'user' is true
                                            // then user is logged in if 'user
                                            // is false then user is logged out.
    if (user) {
        console.log('logged in');        
    } else {
        console.log('logged out');
    }
});

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