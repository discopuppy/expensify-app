import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Action Generators

// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => {
    return ({
        type: 'SET_TEXT_FILTER',
        text // text: text
    });
};
// SORT_BY_DATE
const sortByDate = () => {
    return ({
        type: 'SORT_BY_DATE',
    });
};
// SORT_BY_AMOUNT
const sortByAmount = () => {
    return ({
        type: 'SORT_BY_AMOUNT',
    });
};
// SET_START_DATE
const setStartDate = (startDate) => {
    return ({
        type: 'SET_START_DATE',
        startDate // startDate: startDate
    });
};
// SET_END_DATE
const setEndDate = (endDate) => {
    return ({
        type: 'SET_END_DATE',
        endDate // endDate: endDate
    });
};

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) { // depending on the action.type
        case 'ADD_EXPENSE':
            return [
                ...state, // spread operator, adds on to array without changing state
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => { // .filter will loop through array, 
                                            // if id is not equal to the action id, 
                                            // it will return true and item will be kept, 
                                            // if they do match the item will be removed from 
                                            // the array.
                return id !== action.id;
            });
        case 'EDIT_EXPENSE': 
            return state.map((expense) => {
                if (expense.id === action.id) { // if the expense is a match
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense; // so, no change to expenses unless their a match
                }
            }); 
        default:
            return state;
    }
};

// .concat can be used b/c it doesn't change the state, it only 'adds on' for
// what will be returned on this instance.

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
                // adds on whatever text was passed in below to setTextFilter above
                // added on to the state for one return instance?
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate // concats or changes endDate to passed in variable
            }
        default:
            return state;
    }
};

// timestamps (milliseconds)
// January 1st 1970 at midnight (the beginning or 0) (unix epoch)

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => { // filters out the ones that return true below
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        // match the description
        // .include() matches whatever is passed in
        // using .toLowerCase on description and the text filter makes sure to 
        // de-case-sensitive the search so if something is upper case it will still match

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') { // if sortBy is set on the 'date' filter
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// Store Creation

// state prints once when store is created
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

// state prints again at every instance of store.dispatch
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));

const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));

//store.dispatch(removeExpense({ id: expenseOne.expense.id }));

//store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 })); 
// second value is the 'updates' we're passing to the editExpense action generator

//store.dispatch(setTextFilter('c'));
//store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

//store.dispatch(setStartDate(0));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(999));


const demoState = {
    expenses: [{ // this as an array of objects
        id: 'afldjkf',
        description: 'January Rent',
        noted: 'This was the final payment for that address',
        amount: 54500, // dollars represented in pennies
        createdAt: 0
    }],
    filters: { // this is an object with various properties
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};