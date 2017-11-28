import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log(now.format('MMM Do YYYY'));

// Use local component state to track the changes to all these inputs.
// Only when they user actually submits the form will we do something with the information.

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt): moment(),
            calendarFocused: false,
            error: ''
        };
    }
    // the three functions below before render basically change
    // the state above while you're typing in to the inputs
    onDescriptionChange = (e) => {
        const description = e.target.value; // binding somehow, idk this shit's confusing
        this.setState(() => ({ description: description })); // sets the state for the 
                                                            // value of description, seen
                                                            // above in default state values
    };
    onNoteChange = (e) => {
        const note = e.target.value; // binding
        this.setState(() => ({ note: note })); // sets the State for the value of note, 
                                                // seen above in state default values
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount: amount }));
        }
    };
    onDateChange = (createdAt) => { // not the same as state.createdAt
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault(); // keeps the page from refreshing, the whole point of doing React

        if (!this.state.description || !this.state.amount) {
            // Set error state equal to 'Please provide description and amount
            this.setState(() => ({ error: 'Must fill in description and amount!'}));
        } else {
            // Clear the error
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({ // I think this is using AddExpensePage as the HOC
                                // and being able to pass props through connect...
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, // changes amount string to 
                                                        // a number and keeps the decimal
                createdAt: this.state.createdAt.valueOf(), // createdAt is currently a moment
                                                        // object, this translates it to a timestamp
                note: this.state.note
            });
        }
    };
    render() {
        return (
            <div>
                <p>{this.state.error}</p>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description} // basically sets the value
                                                    // as the state value above
                        onChange={this.onDescriptionChange} // binding
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note} //binding
                        onChange={this.onNoteChange} // binding
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}

