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
                };
            });
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};

export default expensesReducer;