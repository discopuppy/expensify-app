import { createStore } from 'redux';

// So, setCount is a basically a variable being defined in the first section
// The store is set up in the second section and sets cases if a certain type is called
// The third section calls store.dispatch with the defined function along with a value to be passed to the function

// Action generators - functions that return action objects

// ({ incrementBy }) is destructured so that we don't have to do payload.incrementBy below
// the ({} = {}) is setting a default value if incrementBy does not have a value
const incrementCount = ({ incrementBy = 1 } = {}) => ({
        type: 'INCREMENT',
        incrementBy: incrementBy // typeof payload.incrementBy === 'number' ? incrementBy : 1
});

const decrementCount = ({ decrementBy = 1 /*default is 1*/} = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
});

const setCount = ({ setBy } = {}) => ({
    type: 'SET',
    setBy: setBy
});

const resetCount = () => ({
    type: 'RESET',
})

const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.setBy
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
});

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

//store.dispatch({
    //type: 'INCREMENT',
    //incrementBy: 5
//});

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch({
    type: 'INCREMENT',
});

//store.dispatch({
    //type: 'RESET',
//});

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ setBy: 99 }));

// So, setCount is a basically a variable being defined in the first section
// The store is set up in the second section and sets cases if a certain type is called
// The third section calls store.dispatch with the defined function along with a value to be passed to the function
    