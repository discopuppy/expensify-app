import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'), // just moment() by itself is the exact 
                                // moment this is run

    endDate: moment().endOf('month')
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

export default filtersReducer;